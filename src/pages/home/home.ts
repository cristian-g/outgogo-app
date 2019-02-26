import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from './../../services/auth.service';
import { VehiclesService } from './../../services/vehicles.service';
import {first} from "rxjs/operators";
import {Vehicle} from "../../models/vehicle";

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

  public storeVehicle(): void {
    this.loadingStoreVehicle = true;
    const vehicle = new Vehicle();
    vehicle.id = 'id_sample';
    this.vehiclesService.store(vehicle).pipe(first())
      .subscribe(
        data => {
          this.loadingStoreVehicle = false;
          alert('success storing');
        },
        error => {
          alert('error storing' + JSON.stringify(error));
          this.loadingStoreVehicle = false;
          const errorObject = error.errors;
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
