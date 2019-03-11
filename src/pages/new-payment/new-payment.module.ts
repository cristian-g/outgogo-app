import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPaymentPage } from './new-payment';

@NgModule({
  declarations: [
    NewPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPaymentPage),
  ],
})
export class NewPaymentPageModule {}
