import { Component, OnInit } from '@angular/core';
import {Events, NavController, Platform, ModalController, IonicPage} from 'ionic-angular';
import { AuthService } from './../../services/auth.service';
import { VehiclesService } from './../../services/vehicles.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';
import {TosTextPage} from "../tos-text/tos-text";
import {TosModalPage} from "../tos-modal/tos-modal";
import {PrivacyModalPage} from "../privacy-modal/privacy-modal";
import {HelpModalPage} from "../help-modal/help-modal";
import {AboutModalPage} from "../about-modal/about-modal";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  loadingVehicles: boolean;
  errorsLoadingVehicles: any[];

  vehicles: any[];

  closeResult: string;

  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    public vehiclesService: VehiclesService,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public zone: NgZone,
    private storage: Storage,
    public events: Events,
    public modalController: ModalController,
  ) {
    platform.ready().then(() => {
      // Redirect back to app after authenticating
      (window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      }
    });
    const that = this;
    events.subscribe('user:logout', () => {
      that.logout();
    });
    if (auth.loggedIn) {
      this.login();
    }
  }

  async presentModalTos() {
    let modal = this.modalController.create(TosModalPage);
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

  async presentModalPrivacy() {
    let modal = this.modalController.create(PrivacyModalPage);
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

  async presentModalHelp() {
    let modal = this.modalController.create(HelpModalPage);
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

  async presentModalAbout() {
    let modal = this.modalController.create(AboutModalPage);
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

  public login() {
    this.storage.get('id_token').then(token => {
      if (token != null) {
        this.auth.idToken = token;
        this.navCtrl.setRoot('VehiclesListPage');
      }
      else {
        this.auth.login(this.navCtrl);
      }
    });
  }

  ngOnInit(): void {
    this.storage.get('id_token').then(token => {
      if (token != null) {
        this.auth.idToken = token;
      }
    });
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot('HomePage');
  }

  goToTOSPage() {
    this.navCtrl.setRoot('TosPage');

    this.navCtrl.push('TosPage');
  }

  goToPrivacyPage() {
    this.navCtrl.push('PrivacyPage');
  }
}
