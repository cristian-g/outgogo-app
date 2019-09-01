import { Component, ViewChild } from '@angular/core';
import {Platform, Nav, Events, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from './../services/auth.service';

import { HomePage } from '../pages/home/home';
import { VehiclesListPage } from '../pages/vehicles-list/vehicles-list';
import { TosPage } from '../pages/tos/tos';
import { PrivacyPage } from '../pages/privacy/privacy';
import {HelpPage} from "../pages/help/help";
import {AboutPage} from "../pages/about/about";
//import {PointsPage} from "../pages/points/points";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  public pages: Array<{title: string, component: any}>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public auth: AuthService,
    public events: Events,
    public menuCtrl: MenuController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Vehículos', component: VehiclesListPage },
      { title: 'Cómo funciona', component: HelpPage },
      { title: 'Sobre Outgogo', component: AboutPage },
      { title: 'Términos del servicio', component: TosPage },
      { title: 'Política de privacidad', component: PrivacyPage },
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.logout();
    this.nav.setRoot(HomePage);
    this.menuCtrl.toggle();
  }
}
