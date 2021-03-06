import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Outgo} from "../../models/outgo";
import {first} from "rxjs/operators";
import {OutgoesService} from "../../services/outgoes.service";

/**
 * Generated class for the NewOutgoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-outgo',
  templateUrl: 'new-outgo.html',
})
export class NewOutgoPage {
  loading: boolean;
  errors: any[];
  vehicleId = null;
  outgo = new Outgo();
  public mode:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public outgoesService: OutgoesService,
    public alertController: AlertController,
  ) {
    this.mode = this.navParams.get('mode');
    this.vehicleId = this.navParams.get('vehicleId');
    if (this.navParams.get('outgo') != null) {
      this.outgo = this.navParams.get('outgo');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewOutgoPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  public storeOutgo(): void {
    this.loading = true;
    if (this.outgo.share_outgo == null) {
      this.outgo.share_outgo = false;
    }
    if (this.mode === 'new') {
      this.outgoesService.store(this.vehicleId, this.outgo).pipe(first())
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
      this.outgoesService.update(this.outgo).pipe(first())
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
