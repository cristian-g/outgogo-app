import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle } from '../models/vehicle';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {AuthService} from "./auth.service";
import {Action} from "../models/action";

@Injectable()
export class VehiclesService {

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
    return this.http.get<any>('http://192.168.10.10/api/vehicles', { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          const vehiclesArray = new Array<Vehicle>();
          for (let i = 0; i < data.vehicles.length; i++) {
            const jsonObj = data.vehicles[i];
            const vehicle = new Vehicle();
            vehicle.id = jsonObj.id;
            vehicle.brand = jsonObj.brand;
            vehicle.model = jsonObj.model;
            vehicle.key = jsonObj.public_key;
            vehicle.year = jsonObj.purchase_year;
            vehicle.price = jsonObj.purchase_price;
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
    return this.http.post<any>('http://192.168.10.10/api/vehicle', {
      brand: vehicle.brand,
      model: vehicle.model,
      key: vehicle.key,
      year: vehicle.year,
      price: vehicle.price,
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
    alert(vehicleId);
    return this.http.get<any>('http://192.168.10.10/api/vehicle/' + vehicleId, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          const vehicle = new Vehicle;
          vehicle.id = data.vehicle.id;
          vehicle.brand = data.vehicle.brand;
          vehicle.model = data.vehicle.model;
          vehicle.key = data.vehicle.public_key;
          vehicle.year = data.vehicle.purchase_year;
          vehicle.price = data.vehicle.purchase_price;

          const actionsArray = new Array<Action>();
          for (let i = 0; i < data.vehicle.actions.length; i++) {
            const jsonObj = data.vehicle.actions[i];
            const action = new Action();
            action.id = jsonObj.id;
            action.type = 'outgo';
            action.quantity = jsonObj.quantity;
            actionsArray.push(action);
          }
          vehicle.actions = actionsArray;

          return vehicle;
        }
      }));
  }

  // Verb: PUT/PATCH
  // URI: /vehicles/{vehicle}
  // Action: update
  update(vehicleId: number, email: string) {
    return this.http.post<any>('/api/vehicles/' + vehicleId, { vehicle: Vehicle });
  }

  // Verb: DELETE
  // URI: /vehicles/{vehicle}
  // Action: destroy
  destroy(vehicleId: number, email: string) {
    return this.http.post<any>('/api/vehicles/' + vehicleId, {});
  }

  async getaccessToken(key:string): Promise<void>{
    return await this.storage.get('access_token');
  }
}
