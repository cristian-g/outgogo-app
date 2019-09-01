import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutTextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-text',
  templateUrl: 'about-text.html',
})
export class AboutTextPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }
}
