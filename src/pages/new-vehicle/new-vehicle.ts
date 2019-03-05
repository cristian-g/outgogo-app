import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              public vehiclesService: VehiclesService,) {
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

    let method;
    if (this.mode === 'new') {
      method = this.vehiclesService.store;
    }
    else {
      method = this.vehiclesService.store;
    }

    method(this.vehicle).pipe(first())
      .subscribe(
        data => {
          this.loading = false;
        },
        error => {
          this.loading = false;
          alert('error: ' + JSON.stringify(error));
          const errorObject = error.error.errors;
          const dataArray = new Array;
          for (const field in errorObject) {
            if (errorObject.hasOwnProperty(field)) {
              dataArray.push(errorObject[field]);
            }
          }
          this.errors = dataArray;
        });
  }

}
