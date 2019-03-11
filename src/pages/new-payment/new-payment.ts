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
  loadingStorePayment: boolean;
  errorsLoadingStorePayment: any[];
  vehicleId = null;
  payment = new Payment();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public paymentsService: PaymentsService
  ) {
    this.vehicleId = this.navParams.get('vehicleId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPaymentPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  public storePayment(): void {
    this.loadingStorePayment = true;
    this.paymentsService.store(this.vehicleId, this.payment).pipe(first())
      .subscribe(
        data => {
          this.loadingStorePayment = false;
          this.goBack();
        },
        error => {
          alert('error: ' + JSON.stringify(error));
          this.loadingStorePayment = false;
          const errorObject = error.error.errors;
          const dataArray = new Array;
          for (const field in errorObject) {
            if (errorObject.hasOwnProperty(field)) {
              dataArray.push(errorObject[field]);
            }
          }
          this.errorsLoadingStorePayment = dataArray;
        });
  }
}
