import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TosModalPage } from './tos-modal';

@NgModule({
  declarations: [
    TosModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TosModalPage),
  ],
})
export class TosModalPageModule {}
