import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Outgo} from "../../models/outgo";
import {first} from "rxjs/operators";
import {ConsumptionsService} from "../../services/consumptions.service";

/**
 * Generated class for the NewConsumptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-consumption',
  templateUrl: 'new-consumption.html',
})
export class NewConsumptionPage {
  loading: boolean;
  errors: any[];
  vehicleId = null;
  consumption = new Outgo();
  public mode:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public consumptionsService: ConsumptionsService,
    public alertController: AlertController,
  ) {
    this.mode = this.navParams.get('mode');
    this.vehicleId = this.navParams.get('vehicleId');
    if (this.navParams.get('consumption') != null) {
      this.consumption = this.navParams.get('consumption');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewConsumptionPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  public storeConsumption(): void {
    this.loading = true;
    if (this.consumption.share_outgo == null) {
      this.consumption.share_outgo = false;
    }
    if (this.mode === 'new') {
      this.consumptionsService.store(this.vehicleId, this.consumption).pipe(first())
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
            this.presentAlert('Error', this.errors.join('\n'));/*.then(_ => do something);*/
          });
    }
    else {
      this.consumptionsService.update(this.consumption).pipe(first())
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
            this.presentAlert('Error', this.errors.join('\n'));/*.then(_ => do something);*/
          });
    }
  }

  presentAlert(title: string, subtitle: string): Promise<any> {
    const alert = this.alertController.create({
      title: title,
      subTitle: subtitle,
      buttons: [{text: 'OK', role: 'cancel'}]
    });
    return alert.present();
  }
}
