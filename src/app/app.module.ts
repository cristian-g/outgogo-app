import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthService } from './../services/auth.service';
import { VehiclesService } from './../services/vehicles.service';

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
import {APIInterceptor} from "./_helpers/api.interceptor";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {ConsumptionsService} from "../services/consumptions.service";
import {TosTextPage} from "../pages/tos-text/tos-text";
import {TosModalPage} from "../pages/tos-modal/tos-modal";
import {PrivacyTextPage} from "../pages/privacy-text/privacy-text";
import {PrivacyModalPage} from "../pages/privacy-modal/privacy-modal";
import {HelpPage} from "../pages/help/help";
import {HelpTextPage} from "../pages/help-text/help-text";
import {HelpModalPage} from "../pages/help-modal/help-modal";
import {AboutPage} from "../pages/about/about";
import {AboutTextPage} from "../pages/about-text/about-text";
import {AboutModalPage} from "../pages/about-modal/about-modal";
import {HomePageModule} from "../pages/home/home.module";

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TosPage,
    TosTextPage,
    TosModalPage,
    PrivacyPage,
    PrivacyTextPage,
    PrivacyModalPage,
    HelpPage,
    HelpTextPage,
    HelpModalPage,
    AboutPage,
    AboutTextPage,
    AboutModalPage,
    PointsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HomePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    TosPage,
    TosTextPage,
    TosModalPage,
    PrivacyPage,
    PrivacyTextPage,
    PrivacyModalPage,
    HelpPage,
    HelpTextPage,
    HelpModalPage,
    AboutPage,
    AboutTextPage,
    AboutModalPage,
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
    ConsumptionsService,
    PaymentsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
  ]
})
export class AppModule {}
