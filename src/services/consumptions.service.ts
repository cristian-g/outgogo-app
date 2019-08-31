import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Consumption } from '../models/consumption';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {AuthService} from "./auth.service";
import {User} from "../models/user";

@Injectable()
export class ConsumptionsService {
  public domain:string = '';

  constructor(
    private http: HttpClient,
    private storage: Storage,
    public auth: AuthService,
  ) {}

  // Verb: POST
  // URI: /consumptions
  // Action: store
  store(vehicleId: string, consumption: Consumption) {
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
    return this.http.post<any>(this.domain + '/api/vehicle/' + vehicleId + '/consumption', {
      vehicle_id: vehicleId,
      notes: consumption.notes,
      share_consumption: consumption.share_consumption,
      gas_liters: consumption.gas_liters,
      gas_price: consumption.gas_price,
    }, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          // Show success message
          //this.userService.user.showingImportantNotification = true;
        }
      }));
  }

  // Verb: GET
  // URI: /consumptions/{consumption}
  // Action: show
  show(consumptionId: string) {
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
    return this.http.get<any>(this.domain + '/api/outgo/' + consumptionId, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          const consumption = new Consumption();
          consumption.id = data.consumption.id;
          consumption.type = 'consumption';
          consumption.quantity = data.consumption.quantity;
          consumption.description = data.consumption.description;
          consumption.notes = data.consumption.notes;
          consumption.share_consumption = data.consumption.share_consumption;
          consumption.gas_liters = data.consumption.gas_liters;
          consumption.gas_price = data.consumption.gas_price;
          consumption.category = data.consumption.category;
          consumption.createdAt = new Date(data.consumption.created_at);

          const distributionsArray = new Array<Consumption>();

          for (let i = 0; i < data.consumption.distributions.length; i++) {
            const distribution = new Consumption();

            const jsonObj = data.consumption.distributions[i];
            distribution.quantity = jsonObj.quantity;
            distribution.user = new User();
            distribution.user.name = jsonObj.user.name;
            distribution.receiver = new User();
            distribution.receiver.name = jsonObj.receiver.name;

            distributionsArray.push(distribution);
          }
          consumption.distributions = distributionsArray;

          //this.computeFormattedDate(consumption);

          return consumption;
        }
      }));
  }

  private computeFormattedDate(action: Consumption) {
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
  // URI: /consumptions/{consumption}
  // Action: update
  update(consumption: Consumption) {
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
    const consumptionId = consumption.id;
    return this.http.put<any>(this.domain + '/api/consumption/' + consumptionId, {
      quantity: consumption.quantity,
      description: consumption.description,
      notes: consumption.notes,
      share_consumption: consumption.share_consumption,
    }, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          // Show success message
        }
      }));
  }

  // Verb: DELETE
  // URI: /consumptions/{consumption}
  // Action: destroy
  destroy(consumptionId: number, email: string) {
    return this.http.post<any>(this.domain + '/api/consumptions/' + consumptionId, {});
  }

  async getaccessToken(key:string): Promise<void>{
    return await this.storage.get('access_token');
  }
}
