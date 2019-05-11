import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {first} from "rxjs/operators";
import {VehiclesService} from "../../services/vehicles.service";
import {AuthService} from "../../services/auth.service";
import {Action} from "../../models/action";
import {Outgo} from "../../models/outgo";
import {Payment} from "../../models/payment";
import {User} from "../../models/user";

/**
 * Generated class for the ActionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
})
export class ActionsPage implements OnInit {

  // navParams
  public vehicleId:string = null;
  public userId:string = null;

  // State
  public loadingActions:boolean;
  public errorsLoadingActions: any[];
  public loadedActions:boolean = false;

  // Actions array
  public actions:Action[] = new Array<Action>();

  // Balance total
  public total:string;

  // User info
  public user:User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthService,
              public vehiclesService: VehiclesService) {
    this.vehicleId = this.navParams.get('vehicleId');
    this.userId = this.navParams.get('userId');
  }

  public ionViewWillEnter() {
    this.loadActions(this.vehicleId, this.userId);
  }

  ngOnInit(): void {
  }

  goBack() {
    this.navCtrl.pop();
  }

  public loadActions(vehicleId: string, userId: string): void {
    this.loadingActions = true;
    this.vehiclesService.showBalance(vehicleId, userId).pipe(first())
      .subscribe(
        data => {
          this.loadingActions = false;
          this.loadedActions = true;
          this.actions = data.actions;
          this.total = data.total;
          this.user = data.user;
        },
        error => {
          this.loadingActions = false;
          const errorObject = error.error.errors;
          const dataArray = new Array;
          for (const field in errorObject) {
            if (errorObject.hasOwnProperty(field)) {
              dataArray.push(errorObject[field]);
            }
          }
          this.errorsLoadingActions = dataArray;
        });
  }
}
