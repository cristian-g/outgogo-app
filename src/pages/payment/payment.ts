import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Payment} from "../../models/payment";
import {first} from "rxjs/operators";
import {PaymentsService} from "../../services/payments.service";

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  public paymentId:string = null;
  payment = new Payment();
  loading:boolean = false;
  loadedPayment:boolean = false;
  errors: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public paymentsService: PaymentsService
  ) {
    this.paymentId = this.navParams.get('paymentId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  public ionViewWillEnter() {
    this.loadPayment(this.paymentId);
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToEditPaymentPage() {
    this.navCtrl.push('NewPaymentPage', {
      payment: this.payment,
      mode: 'edit',
    });
  }

  public loadPayment(id:string): void {
    this.loading = true;
    this.paymentsService.show(id).pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.loadedPayment = true;
          this.payment = data;
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
