import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from '../models/payment';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {AuthService} from "./auth.service";

@Injectable()
export class PaymentsService {

  constructor(
    private http: HttpClient,
    private storage: Storage,
    public auth: AuthService,
  ) {}

  // Verb: POST
  // URI: /payments
  // Action: store
  store(vehicleId: string, payment: Payment) {
    var headers = null;
    if (this.auth.idToken == null) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
    else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth.idToken
      });
    }
    return this.http.post<any>('http://192.168.10.10/api/vehicle/' + vehicleId + '/payment', {
      vehicle_id: vehicleId,
      quantity: payment.quantity,
    }, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          // Show success message
          //this.userService.user.showingImportantNotification = true;
        }
      }));
  }

  // Verb: GET
  // URI: /payments/{payment}
  // Action: show
  show(paymentId: string) {
    var headers = null;
    if (this.auth.idToken == null) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
    else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth.idToken
      });
    }
    return this.http.get<any>('http://192.168.10.10/api/payment/' + paymentId, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          const payment = new Payment();
          payment.id = data.payment.id;
          payment.type = 'payment';
          payment.quantity = data.payment.quantity;
          return payment;
        }
      }));
  }

  // Verb: PUT/PATCH
  // URI: /payments/{payment}
  // Action: update
  update(payment: Payment) {
    var headers = null;
    if (this.auth.idToken == null) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
    else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth.idToken
      });
    }
    const paymentId = payment.id;
    return this.http.put<any>('http://192.168.10.10/api/payment/' + paymentId, {
      quantity: payment.quantity,
    }, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          // Show success message
        }
      }));
  }

  // Verb: DELETE
  // URI: /payments/{payment}
  // Action: destroy
  destroy(paymentId: number, email: string) {
    return this.http.post<any>('/api/payments/' + paymentId, {});
  }

  async getaccessToken(key:string): Promise<void>{
    return await this.storage.get('access_token');
  }
}
