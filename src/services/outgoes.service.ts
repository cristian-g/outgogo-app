import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Outgo } from '../models/outgo';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {AuthService} from "./auth.service";

@Injectable()
export class OutgoesService {

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
    return this.http.post<any>('http://192.168.10.10/api/vehicle/' + vehicleId + '/outgo', {
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
    alert(outgoId);
    return this.http.get<any>('http://192.168.10.10/api/outgo/' + outgoId, { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          const outgo = new Outgo;
          outgo.id = data.outgo.id;
          outgo.type = 'outgo';
          outgo.quantity = data.outgo.quantity;
          outgo.description = data.outgo.description;
          outgo.notes = data.outgo.notes;
          outgo.share_outgo = data.outgo.share_outgo;
          outgo.category = data.outgo.category;
          return outgo;
        }
      }));
  }

  // Verb: PUT/PATCH
  // URI: /outgoes/{outgo}
  // Action: update
  update(outgoId: number, email: string) {
    return this.http.post<any>('/api/outgoes/' + outgoId, { outgo: Outgo });
  }

  // Verb: DELETE
  // URI: /outgoes/{outgo}
  // Action: destroy
  destroy(outgoId: number, email: string) {
    return this.http.post<any>('/api/outgoes/' + outgoId, {});
  }

  async getaccessToken(key:string): Promise<void>{
    return await this.storage.get('access_token');
  }
}
