import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './../services/auth.service';
import { VehiclesService } from './../services/vehicles.service';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ActionsService} from "../services/actions.service";
import {OutgoesService} from "../services/outgoes.service";
import {TosPage} from "../pages/tos/tos";
import {PrivacyPage} from "../pages/privacy/privacy";
import {PointsPage} from "../pages/points/points";
import {PaymentsService} from "../services/payments.service";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TosPage,
    PrivacyPage,
    PointsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TosPage,
    PrivacyPage,
    PointsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    VehiclesService,
    ActionsService,
    OutgoesService,
    PaymentsService,
  ]
})
export class AppModule {}
