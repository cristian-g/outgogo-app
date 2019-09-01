import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivacyModalPage } from './privacy-modal';

@NgModule({
  declarations: [
    PrivacyModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivacyModalPage),
  ],
})
export class PrivacyModalPageModule {}
