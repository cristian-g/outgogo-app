import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from './../../services/auth.service';
import { VehiclesService } from './../../services/vehicles.service';
import {first} from "rxjs/operators";
import {Vehicle} from "../../models/vehicle";

/**
 * Generated class for the VehiclesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehicles-list',
  templateUrl: 'vehicles-list.html',
})
export class VehiclesListPage implements OnInit {
  loadingVehicles: boolean;
  errorsLoadingVehicles: any[];

  vehicles = new Array<Vehicle>();

  loadingStoreVehicle: boolean;
  errorsLoadingStoreVehicle: any[];

  constructor(public navCtrl: NavController,
              public auth: AuthService,
              public vehiclesService: VehiclesService) {
  }

  ngOnInit(): void {
    //this.loadVehicles();
  }

  public ionViewWillEnter() {
    this.loadVehicles();
  }

  goToNewVehiclePage() {
    this.navCtrl.push('NewVehiclePage');
  }

  goToVehiclePage(id: string) {
    this.navCtrl.push('VehiclePage', {vehicleId: id});
  }

  public loadVehicles(): void {
    this.loadingVehicles = true;
    this.vehiclesService.index().pipe(first())
      .subscribe(
        data => {
          this.loadingVehicles = false;
          this.vehicles = data;
        },
        error => {
          this.loadingVehicles = false;
          const errorObject = error.error.errors;
          const dataArray = new Array;
          for (const field in errorObject) {
            if (errorObject.hasOwnProperty(field)) {
              dataArray.push(errorObject[field]);
            }
          }
          this.errorsLoadingVehicles = dataArray;
        });
  }
}
