import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle } from '../models/vehicle';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {AuthService} from "./auth.service";
import {Action} from "../models/action";
import {Outgo} from "../models/outgo";
import {Payment} from "../models/payment";
import {FinancialStatus} from "../models/financialStatus";
import {User} from "../models/user";

@Injectable()
export class VehiclesService {
  public domain:string = '';

  constructor(
    private http: HttpClient,
    private storage: Storage,
    public auth: AuthService,
  ) {}

  // Verb: GET
  // URI: /vehicles
  // Action: index
  index() {
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
    return this.http.get<any>(this.domain + '/api/vehicles', { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          const vehiclesArray = new Array<Vehicle>();
          for (let i = 0; i < data.vehicles.length; i++) {
            const jsonObj = data.vehicles[i];
            const vehicle = new Vehicle();
            vehicle.id = jsonObj.id;
            vehicle.brand = jsonObj.brand;
            vehicle.model = jsonObj.model;
            vehicle.balance = jsonObj.balance;
            vehicle.sharing_status = jsonObj.sharing_status;
            vehiclesArray.push(vehicle);
          }
          return vehiclesArray;
        }
      }));
  }

  // Verb: POST
  // URI: /vehicles
  // Action: store
  store(vehicle: Vehicle) {
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
    return this.http.post<any>(this.domain + '/api/vehicle', {
      brand: vehicle.brand,
      model: vehicle.model,
      emails: vehicle.emails,
    }, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          // Show success message
          //this.userService.user.showingImportantNotification = true;
        }
      }));
  }

  // Verb: GET
  // URI: /vehicles/{vehicle}
  // Action: show
  show(vehicleId: string) {
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
    return this.http.get<any>(this.domain + '/api/vehicle/' + vehicleId, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          const vehicle = new Vehicle;
          vehicle.id = data.vehicle.id;
          vehicle.brand = data.vehicle.brand;
          vehicle.model = data.vehicle.model;
          vehicle.balance = data.vehicle.balance;
          vehicle.sharing_status = data.vehicle.sharing_status;

          // Copy emails
          vehicle.emails = new Array(data.vehicle.emails.length);
          for (let i = 0; i < data.vehicle.emails.length; i++) {
            vehicle.emails[i] = data.vehicle.emails[i];
          }

          const actionsArray = new Array<Action>();
          var prevDate:Date = null;
          for (let i = 0; i < data.vehicle.actions.length; i++) {
            const jsonObj = data.vehicle.actions[i];
            if (jsonObj.outgo != null) {
              const action = new Outgo();
              action.type = 'outgo';
              action.quantity = jsonObj.outgo.quantity;
              action.description = jsonObj.outgo.description;
              action.explanation = action.description;
              action.notes = jsonObj.outgo.notes;
              action.share_outgo = jsonObj.outgo.share_outgo;
              action.category = jsonObj.outgo.category;

              const user:User = new User();
              user.name = jsonObj.outgo.user.name;
              user.id = jsonObj.outgo.user.id;
              action.user = user;
              action.id = jsonObj.outgo.id;
              action.createdAt = new Date(jsonObj.created_at);
              this.computeFormattedDate(action, prevDate);
              prevDate = action.createdAt;
              actionsArray.push(action);
            }
            else if (jsonObj.payment != null) {
              const action = new Payment();
              action.type = 'payment';
              action.quantity = jsonObj.payment.quantity;
              action.explanation = 'Ha pagado a ' + jsonObj.payment.receiver.name;

              const user:User = new User();
              user.name = jsonObj.payment.user.name;
              user.id = jsonObj.payment.user.id;
              action.user = user;
              action.id = jsonObj.payment.id;
              action.createdAt = new Date(jsonObj.created_at);
              this.computeFormattedDate(action, prevDate);
              prevDate = action.createdAt;
              actionsArray.push(action);
            }
          }
          vehicle.actions = actionsArray;

          // Financial status
          const balances = new Array<FinancialStatus>();
          for (let i = 0; i < data.vehicle.balances.length; i++) {
            const jsonObj = data.vehicle.balances[i];
            const user:User = new User();
            user.name = jsonObj.name;
            user.id = jsonObj.id;
            const financialStatus:FinancialStatus = new FinancialStatus();
            financialStatus.user = user;

            financialStatus.balance = jsonObj.balance;

            const value = (jsonObj.balance < 0) ? jsonObj.balance * (-1) : jsonObj.balance;
            const decimalPlaces = 2;
            financialStatus.formattedBalance = Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces).toFixed(2);

            balances.push(financialStatus);
          }
          vehicle.balances = balances;

          // Users
          const users = new Array<User>();
          for (let i = 0; i < data.vehicle.user_ids.length; i++) {
            const jsonObj = data.vehicle.user_ids[i];
            const user:User = new User();
            user.name = jsonObj.name;
            user.id = jsonObj.id;
            users.push(user);
          }
          vehicle.users = users;

          return vehicle;
        }
      }));
  }

  // Verb: GET
  // URI: /vehicles/{vehicle}/user/{user_id}
  // Action: show_balance
  showBalance(vehicleId: string, userId: string) {
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
    return this.http.get<any>(this.domain + '/api/vehicle/' + vehicleId + '/user/' + userId, { headers: headers })
      .pipe(map((data: any) => {

        if (data) {
          const actionsArray = new Array<Action>();
          var prevDate:Date = null;
          for (let i = 0; i < data.actions.length; i++) {
            const jsonObj = data.actions[i];
            const action = new Action();

            if ('original_outgo' in jsonObj) {
              action.explanation = jsonObj.description;
            }
            if ('original_payment' in jsonObj) {
              action.explanation = 'Pago';
            }

            action.quantity = jsonObj.quantity;
            action.positive = jsonObj.positive == true;
            action.createdAt = new Date(jsonObj.created_at);
            this.computeFormattedDate(action, prevDate);
            prevDate = action.createdAt;
            actionsArray.push(action);
          }

          // User info
          const user = new User();
          user.name = data.user.name;
          user.id = data.user.id;

          return {
            'actions': actionsArray,
            'total': data.total,
            'user': user
          };
        }
      }));
  }

  private computeFormattedDate(action: Action, prevDate: Date) {
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

    if (prevDate == null) {
      action.differentDay = true;
    }
    else {
      const date1 = new Date(action.createdAt.getTime()).setHours(0,0,0,0);
      const date2 = new Date(prevDate.getTime()).setHours(0,0,0,0);
      action.differentDay = date1 !== date2;
    }
  }

  // Verb: PUT
  // URI: /vehicles/{vehicle}
  // Action: update
  update(vehicle: Vehicle) {
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
    const vehicleId = vehicle.id;

    return this.http.put<any>(this.domain + '/api/vehicle/' + vehicleId, {
      brand: vehicle.brand,
      model: vehicle.model,
      emails: vehicle.emails,
    }, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          // Show success message
          //this.userService.user.showingImportantNotification = true;
        }
      }));
  }

  // Verb: DELETE
  // URI: /vehicles/{vehicle}
  // Action: destroy
  destroy(vehicleId: number, email: string) {
    return this.http.post<any>(this.domain + '/api/vehicles/' + vehicleId, {});
  }

  async getaccessToken(key:string): Promise<void>{
    return await this.storage.get('access_token');
  }
}
