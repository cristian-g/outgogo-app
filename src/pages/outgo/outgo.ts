import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Outgo} from "../../models/outgo";
import {first} from "rxjs/operators";
import {OutgoesService} from "../../services/outgoes.service";

/**
 * Generated class for the OutgoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-outgo',
  templateUrl: 'outgo.html',
})
export class OutgoPage {
  public outgoId:string = null;
  outgo = new Outgo();
  loading:boolean = false;
  loadedOutgo:boolean = false;
  errors: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public outgoesService: OutgoesService
  ) {
    this.outgoId = this.navParams.get('outgoId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutgoPage');
  }

  public ionViewWillEnter() {
    this.loadOutgo(this.outgoId);
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToEditOutgoPage() {
    this.navCtrl.push('NewOutgoPage', {
      outgo: this.outgo,
      mode: 'edit',
    });
  }

  public loadOutgo(id:string): void {
    this.loading = true;
    this.outgoesService.show(id).pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.loadedOutgo = true;
          this.outgo = data;
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
