import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from '../models/payment';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {AuthService} from "./auth.service";

@Injectable()
export class PaymentsService {
  //public domain:string = 'http://192.168.10.10/api';
  public domain:string = 'http://outgogo.cristiangonzalez.com/api';

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
    return this.http.post<any>(this.domain + '/api/vehicle/' + vehicleId + '/payment', {
      vehicle_id: vehicleId,
      quantity: payment.quantity,
      receiver: payment.receiver.id,
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
    return this.http.get<any>(this.domain + '/api/payment/' + paymentId, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          const payment = new Payment();

          payment.id = data.payment.id;
          payment.type = 'payment';
          payment.quantity = data.payment.quantity;
          payment.explanation = data.payment.user.name + ' ha pagado a ' + data.payment.receiver.name;
          payment.createdAt = new Date(data.payment.created_at);
          //this.computeFormattedDate(payment);

          return payment;
        }
      }));
  }

  private computeFormattedDate(action: Payment) {
    // Format date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    action.formattedDate = action.createdAt.toLocaleDateString("es-ES", options);

    const a = new Date();  // Today
    const b = new Date();  // Yesterday
    b.setDate(new Date().getDate() - 1);  // Yesterday
    const c = new Date(action.createdAt.getTime());

    a.setHours(0,0,0,0);
    b.setHours(0,0,0,0);
    c.setHours(0,0,0,0);

    if (a.getTime() == c.getTime())
      action.formattedDate = "Hoy";
    else if (b.getTime() == c.getTime())
      action.formattedDate = "Ayer";
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
    return this.http.put<any>(this.domain + '/api/payment/' + paymentId, {
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
    return this.http.post<any>(this.domain + '/api/payments/' + paymentId, {});
  }

  async getaccessToken(key:string): Promise<void>{
    return await this.storage.get('access_token');
  }
}
