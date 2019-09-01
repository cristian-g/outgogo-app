import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HelpTextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help-text',
  templateUrl: 'help-text.html',
})
export class HelpTextPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }
}
