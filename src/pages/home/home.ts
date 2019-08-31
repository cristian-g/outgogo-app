import { Component, OnInit } from '@angular/core';
import {Events, NavController, Platform} from 'ionic-angular';
import { AuthService } from './../../services/auth.service';
import { VehiclesService } from './../../services/vehicles.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  loadingVehicles: boolean;
  errorsLoadingVehicles: any[];

  vehicles: any[];

  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    public vehiclesService: VehiclesService,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public zone: NgZone,
    private storage: Storage,
    public events: Events
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
