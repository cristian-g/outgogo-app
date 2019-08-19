import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  public domain:string = '';

  user: User = new User;

    constructor(
        private http: HttpClient,
    ) {}

    // Verb: GET
    // URI: /user
    // Action: show
    show() {
        return this.http.get<any>(this.domain + '/api/user', {})
            .pipe(map((data: any) => {
                if (data) {
                    this.user.id = data.user.id;
                    this.user.email = data.user.email;
                }
            }));
    }

    // Verb: PUT/PATCH
    // URI: /user
    // Action: update
    update(user: User) {
        return this.http.patch<any>(this.domain + '/api/user', {
            name: user.email,
            //hide_email: user.hideEmail
        });
    }

    // Verb: DELETE
    // URI: /user
    // Action: destroy
    destroy() {
        return this.http.delete<any>(this.domain + '/api/user', {});
    }
}
