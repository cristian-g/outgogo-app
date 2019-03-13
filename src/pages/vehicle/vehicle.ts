import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {first} from "rxjs/operators";
import {VehiclesService} from "../../services/vehicles.service";
import {AuthService} from "../../services/auth.service";
import {Vehicle} from "../../models/vehicle";
import {Action} from "../../models/action";
import {Outgo} from "../../models/outgo";
import {Payment} from "../../models/payment";

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
  public errorsLoadingVehicle: any[];
  public vehicle:Vehicle = new Vehicle();
  public loadedVehicle:boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthService,
              public vehiclesService: VehiclesService) {
    this.vehicleId = this.navParams.get('vehicleId');
  }

  ngOnInit(): void {
    //this.loadOutgo(this.vehicleId);
  }

  public ionViewWillEnter() {
    this.loadVehicle(this.vehicleId);
  }

  goToNewOutgoPage() {
    this.navCtrl.push('NewOutgoPage', {
      vehicleId: this.vehicleId,
      mode: 'new',
    });
  }

  goToOutgoPage(id:string) {
    this.navCtrl.push('OutgoPage', {outgoId: id});
  }

  goToNewPaymentPage() {
    this.navCtrl.push('NewPaymentPage', {
      vehicleId: this.vehicleId,
      mode: 'new',
    });
  }

  goToPaymentPage(id:string) {
    this.navCtrl.push('PaymentPage', {paymentId: id});
  }

  goToPage(type:string, action:Action) {
    switch (type) {
      case 'outgo':
        this.goToOutgoPage((action as Outgo).id);
        break;
      case 'payment':
        this.goToPaymentPage((action as Payment).id);
        break;
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToEditVehiclePage() {
    this.navCtrl.push('NewVehiclePage', {
      vehicle: this.vehicle,
      mode: 'edit',
    });
  }

  public loadVehicle(id:string): void {
    this.loadingVehicle = true;
    this.vehiclesService.show(id).pipe(first())
      .subscribe(
        data => {
          alert('data: ' + JSON.stringify(data));

          this.loadingVehicle = false;
          this.loadedVehicle = true;
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
