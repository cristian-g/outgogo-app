import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {VehiclesService} from "../../services/vehicles.service";
import {Vehicle} from "../../models/vehicle";
import {first} from "rxjs/operators";

/**
 * Generated class for the NewVehiclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-vehicle',
  templateUrl: 'new-vehicle.html',
})
export class NewVehiclePage {
  errorsLoadingVehicles: any[];

  vehicles: any[];

  loading: boolean;
  errors: any[];

  public vehicle:Vehicle = new Vehicle();
  public mode:string;

  emailsNum: number;
  email1: string;
  email2: string;
  email3: string;
  email4: string;
  email5: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthService,
              public vehiclesService: VehiclesService,
              public alertController: AlertController,
              ) {
    this.vehicle.emails = new Array;
    this.emailsNum = 1;

    if (this.navParams.get('vehicle') != null) {
      this.vehicle = this.navParams.get('vehicle');

      this.emailsNum = this.vehicle.emails.length;
      if (this.emailsNum >= 1) this.email1 = <string> this.vehicle.emails[0];
      if (this.emailsNum >= 2) this.email2 = <string> this.vehicle.emails[1];
      if (this.emailsNum >= 3) this.email3 = <string> this.vehicle.emails[2];
      if (this.emailsNum >= 4) this.email4 = <string> this.vehicle.emails[3];
      if (this.emailsNum >= 5) this.email5 = <string> this.vehicle.emails[4];
    }
    this.mode = this.navParams.get('mode');
  }

  ionViewDidLoad() {
  }

  add() {
    this.emailsNum++;
  }

  less() {
    this.emailsNum--;
  }

  goBack() {
    this.navCtrl.pop();
  }

  public storeVehicle(): void {
    this.loading = true;

    if (this.emailsNum >= 1) this.vehicle.emails.push(this.email1);
    if (this.emailsNum >= 2) this.vehicle.emails.push(this.email2);
    if (this.emailsNum >= 3) this.vehicle.emails.push(this.email3);
    if (this.emailsNum >= 4) this.vehicle.emails.push(this.email4);
    if (this.emailsNum >= 5) this.vehicle.emails.push(this.email5);

    if (this.mode === 'new') {
      this.vehiclesService.store(this.vehicle).pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.goBack();
          },
          error => {
            this.loading = false;
            const errorObject = error.error.errors;
            const dataArray = new Array;
            for (const field in errorObject) {
              if (errorObject.hasOwnProperty(field)) {
                dataArray.push(errorObject[field]);
              }
            }
            this.errors = dataArray;
            this.presentAlert('Error', this.errors.join('\n'));/*.then(_ => do something);*/
          });
    }
    else {
      this.vehiclesService.update(this.vehicle).pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.goBack();
          },
          error => {

            this.loading = false;
            const errorObject = error.error.errors;
            const dataArray = new Array;
            for (const field in errorObject) {
              if (errorObject.hasOwnProperty(field)) {
                dataArray.push(errorObject[field]);
              }
            }
            this.errors = dataArray;
            this.presentAlert('Error', this.errors.join('\n'));/*.then(_ => do something);*/
          });
    }
  }

  presentAlert(title: string, subtitle: string): Promise<any> {
    const alert = this.alertController.create({
      title: title,
      subTitle: subtitle,
      buttons: [{text: 'OK', role: 'cancel'}]
    });
    return alert.present();
  }
}
