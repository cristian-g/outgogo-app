import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutgoPage } from './outgo';

@NgModule({
  declarations: [
    OutgoPage,
  ],
  imports: [
    IonicPageModule.forChild(OutgoPage),
  ],
})
export class OutgoPageModule {}
