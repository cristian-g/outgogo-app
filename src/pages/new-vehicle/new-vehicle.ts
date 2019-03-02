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

  loadingStoreVehicle: boolean;
  errorsLoadingStoreVehicle: any[];

  filmId = null;

  public anArray = new Array<String>();

  vehicle = new Vehicle();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthService,
              public vehiclesService: VehiclesService,) {
    this.filmId = this.navParams.get('filmId');
    alert(this.filmId);
    this.anArray.push('');
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
    this.loadingStoreVehicle = true;
    this.vehicle.emails = this.anArray;
    alert('emails array1: ' + JSON.stringify(this.anArray));

    this.vehiclesService.store(this.vehicle).pipe(first())
      .subscribe(
        data => {
          this.loadingStoreVehicle = false;
          alert('emails array2: ' + JSON.stringify(this.anArray));
          alert('success storing');
        },
        error => {
          alert('error storing' + JSON.stringify(error));
          this.loadingStoreVehicle = false;
          const errorObject = error.error.errors;
          const dataArray = new Array;
          for (const field in errorObject) {
            if (errorObject.hasOwnProperty(field)) {
              dataArray.push(errorObject[field]);
            }
          }
          this.errorsLoadingStoreVehicle = dataArray;
        });
  }

}
