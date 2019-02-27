import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from './../../services/auth.service';
import { VehiclesService } from './../../services/vehicles.service';
import {first} from "rxjs/operators";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  loadingVehicles: boolean;
  errorsLoadingVehicles: any[];

  vehicles: any[];

  loadingStoreVehicle: boolean;
  errorsLoadingStoreVehicle: any[];

  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    public vehiclesService: VehiclesService
  ) {
  }

  ngOnInit(): void {
    this.loadVehicles();
  }

  goToNewVehiclePage() {
    this.navCtrl.push('NewVehiclePage');
  }

  public loadVehicles(): void {
    this.loadingVehicles = true;
    this.vehiclesService.index().pipe(first())
      .subscribe(
        data => {
          this.loadingVehicles = false;
          this.vehicles = data;
          alert('success');
        },
        error => {
          alert('error' + JSON.stringify(error));
          this.loadingVehicles = false;
          const errorObject = error.errors;
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
