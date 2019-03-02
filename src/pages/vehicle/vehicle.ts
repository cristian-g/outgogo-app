import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {first} from "rxjs/operators";
import {VehiclesService} from "../../services/vehicles.service";
import {AuthService} from "../../services/auth.service";
import {Vehicle} from "../../models/vehicle";

/**
 * Generated class for the VehiclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage implements OnInit {
  public vehicleId:string = null;
  public loadingVehicle:boolean;
  errorsLoadingVehicle: any[];
  vehicle = new Vehicle();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthService,
              public vehiclesService: VehiclesService) {
    this.vehicleId = this.navParams.get('vehicleId');
    alert(this.vehicleId);
  }

  ngOnInit(): void {
    //this.loadVehicle(this.vehicleId);
  }

  public ionViewWillEnter() {
    this.loadVehicle(this.vehicleId);
  }

  goToNewOutgoPage() {
    this.navCtrl.push('NewOutgoPage', {vehicleId: this.vehicleId});
  }

  goToOutgoPage(id:string) {
    this.navCtrl.push('OutgoPage', {outgoId: id});
  }

  goBack() {
    this.navCtrl.pop();
  }

  public loadVehicle(id:string): void {
    this.loadingVehicle = true;
    this.vehiclesService.show(id).pipe(first())
      .subscribe(
        data => {
          this.loadingVehicle = false;
          this.vehicle = data;
        },
        error => {
          alert('error: ' + JSON.stringify(error));
          this.loadingVehicle = false;
          const errorObject = error.error.errors;
          const dataArray = new Array;
          for (const field in errorObject) {
            if (errorObject.hasOwnProperty(field)) {
              dataArray.push(errorObject[field]);
            }
          }
          this.errorsLoadingVehicle = dataArray;
        });
  }
}
