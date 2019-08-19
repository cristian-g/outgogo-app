import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { Storage } from '@ionic/storage';
import {AuthService} from "./auth.service";

//import { Action } from '../models/action';
import {Outgo} from "../models/outgo";

@Injectable()
export class ActionsService {
  public domain:string = '';

  constructor(
    private http: HttpClient,
    //private storage: Storage,
    public auth: AuthService,
  ) {}

  // Verb: GET
  // URI: /actions
  // Action: index
  index(vehicleId: string) {
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
    return this.http.get<any>(this.domain + '/api/vehicle/' + vehicleId + '/actions', { headers: headers })
      .pipe(map((data: any) => {
        if (data) {
          const outgoesArray = new Array<Outgo>();
          for (let i = 0; i < data.outgoes.length; i++) {
            const jsonObj = data.outgoes[i];
            const outgo = new Outgo();
            outgo.id = jsonObj.id;
            outgo.type = 'outgo';
            outgo.quantity = jsonObj.quantity;
            outgo.description = jsonObj.description;
            outgo.notes = jsonObj.notes;
            outgo.share_outgo = jsonObj.share_outgo;
            outgo.category = jsonObj.category;
            outgoesArray.push(outgo);
          }
          return outgoesArray;
        }
      }));
  }
}
