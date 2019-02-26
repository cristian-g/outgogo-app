﻿import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    user: User = new User;

    constructor(
        private http: HttpClient,
    ) {}

    // Verb: GET
    // URI: /user
    // Action: show
    show() {
        return this.http.get<any>('/api/user', {})
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
        return this.http.patch<any>('/api/user', {
            name: user.email,
            //hide_email: user.hideEmail
        });
    }

    // Verb: DELETE
    // URI: /user
    // Action: destroy
    destroy() {
        return this.http.delete<any>('/api/user', {});
    }
}
