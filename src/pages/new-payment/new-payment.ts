import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Payment} from "../../models/payment";
import {first} from "rxjs/operators";
import {PaymentsService} from "../../services/payments.service";

/**
 * Generated class for the NewPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-payment',
  templateUrl: 'new-payment.html',
})
export class NewPaymentPage {
  loading: boolean;
  errors: any[];
  vehicleId = null;
  payment = new Payment();
  public mode:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public paymentsService: PaymentsService
  ) {
    this.mode = this.navParams.get('mode');
    this.vehicleId = this.navParams.get('vehicleId');
    if (this.navParams.get('payment') != null) {
      this.payment = this.navParams.get('payment');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPaymentPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  public storePayment(): void {
    this.loading = true;
    if (this.mode === 'new') {
      this.paymentsService.store(this.vehicleId, this.payment).pipe(first())
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
          });
    }
    else {
      this.paymentsService.update(this.payment).pipe(first())
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
          });
    }
  }
}
