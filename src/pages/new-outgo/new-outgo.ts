import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  loadingStoreOutgo: boolean;
  errors: any[];
  vehicleId = null;
  outgo = new Outgo();
  public mode:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public outgoesService: OutgoesService
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
    this.loadingStoreOutgo = true;
    if (this.outgo.share_outgo == null) {
      this.outgo.share_outgo = false;
    }
    if (this.mode === 'new') {
      this.outgoesService.store(this.vehicleId, this.outgo).pipe(first())
        .subscribe(
          data => {
            this.loadingStoreOutgo = false;
            this.goBack();
          },
          error => {
            this.loadingStoreOutgo = false;
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
      this.outgoesService.update(this.outgo).pipe(first())
        .subscribe(
          data => {
            this.loadingStoreOutgo = false;
            this.goBack();
          },
          error => {
            this.loadingStoreOutgo = false;
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
