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

  filmId = null;

  public anArray = new Array<String>();

  public vehicle:Vehicle = new Vehicle();
  public mode:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthService,
              public vehiclesService: VehiclesService,
              public alertController: AlertController,
              ) {
    this.anArray.push('');
    if (this.navParams.get('vehicle') != null) {
      this.vehicle = this.navParams.get('vehicle');
    }
    this.mode = this.navParams.get('mode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewVehiclePage');
  }

  Add(){
    this.anArray.push('');
  }

  goBack() {
    this.navCtrl.pop();
  }

  public storeVehicle(): void {
    this.loading = true;
    this.vehicle.emails = this.anArray;

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
