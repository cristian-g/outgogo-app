import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle } from '../models/vehicle';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {AuthService} from "./auth.service";

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
    alert('Hey, get. Bearer ' + this.auth.accessToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.idToken
    });
    return this.http.get<any>('http://192.168.10.10/api/vehicles', { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          const vehiclesArray = new Array<Vehicle>();
          for (let i = 0; i < data.vehicles.length; i++) {
            const jsonObj = data.vehicles[i];
            const vehicle = new Vehicle();
            vehicle.id = jsonObj.id;
            vehiclesArray.push(vehicle);
          }
          return vehiclesArray;
          //this.userService.user.availableVehicles = vehiclesArray;
        }
      }));
  }

  // Verb: POST
  // URI: /vehicles
  // Action: store
  store(vehicle: Vehicle) {
    alert('Hey, post. Bearer ' + this.auth.accessToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.idToken
    });
    return this.http.post<any>('http://192.168.10.10/api/vehicle', { stamp_model: vehicle.id }, { headers: headers })
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
  show(vehicleId: number) {
    return this.http.post<any>('/api/vehicles/' + vehicleId, {});
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
