import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Outgo } from '../models/outgo';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {AuthService} from "./auth.service";
import {User} from "../models/user";

@Injectable()
export class OutgoesService {
  public domain:string = '';

  constructor(
    private http: HttpClient,
    private storage: Storage,
    public auth: AuthService,
  ) {}

  // Verb: POST
  // URI: /outgoes
  // Action: store
  store(vehicleId: string, outgo: Outgo) {
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
    return this.http.post<any>(this.domain + '/api/vehicle/' + vehicleId + '/outgo', {
      vehicle_id: vehicleId,
      quantity: outgo.quantity,
      description: outgo.description,
      notes: outgo.notes,
      share_outgo: outgo.share_outgo,
    }, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          // Show success message
          //this.userService.user.showingImportantNotification = true;
        }
      }));
  }

  // Verb: GET
  // URI: /outgoes/{outgo}
  // Action: show
  show(outgoId: string) {
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
    return this.http.get<any>(this.domain + '/api/outgo/' + outgoId, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          const outgo = new Outgo();
          outgo.id = data.outgo.id;
          outgo.type = 'outgo';
          outgo.quantity = data.outgo.quantity;
          outgo.description = data.outgo.description;
          outgo.notes = data.outgo.notes;
          outgo.share_outgo = data.outgo.share_outgo;
          outgo.category = data.outgo.category;
          outgo.createdAt = new Date(data.outgo.created_at);
          this.computeFormattedAbsoluteDate(outgo);

          const distributionsArray = new Array<Outgo>();

          for (let i = 0; i < data.outgo.distributions.length; i++) {
            const distribution = new Outgo();

            const jsonObj = data.outgo.distributions[i];
            distribution.quantity = jsonObj.quantity;
            distribution.user = new User();
            distribution.user.name = jsonObj.user.name;
            distribution.receiver = new User();
            distribution.receiver.name = jsonObj.receiver.name;

            distributionsArray.push(distribution);
          }
          outgo.distributions = distributionsArray;

          //this.computeFormattedDate(outgo);

          return outgo;
        }
      }));
  }

  private computeFormattedDate(action: Outgo) {
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

  private computeFormattedAbsoluteDate(action: Outgo) {
    // Format date
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit', hour12: false };
    action.formattedAbsoluteDate = action.createdAt.toLocaleString("es-ES", options);
  }

  // Verb: PUT/PATCH
  // URI: /outgoes/{outgo}
  // Action: update
  update(outgo: Outgo) {
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
    const outgoId = outgo.id;
    return this.http.put<any>(this.domain + '/api/outgo/' + outgoId, {
      quantity: outgo.quantity,
      description: outgo.description,
      notes: outgo.notes,
      share_outgo: outgo.share_outgo,
    }, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          // Show success message
        }
      }));
  }

  // Verb: DELETE
  // URI: /outgoes/{outgo}
  // Action: destroy
  destroy(outgoId: number, email: string) {
    return this.http.post<any>(this.domain + '/api/outgoes/' + outgoId, {});
  }

  async getaccessToken(key:string): Promise<void>{
    return await this.storage.get('access_token');
  }
}
