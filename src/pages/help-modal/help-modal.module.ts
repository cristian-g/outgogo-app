import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpModalPage } from './help-modal';

@NgModule({
  declarations: [
    HelpModalPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpModalPage),
  ],
})
export class HelpModalPageModule {}
