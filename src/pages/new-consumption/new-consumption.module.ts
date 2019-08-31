import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewConsumptionPage } from './new-consumption';

@NgModule({
  declarations: [
    NewConsumptionPage,
  ],
  imports: [
    IonicPageModule.forChild(NewConsumptionPage),
  ],
})
export class NewConsumptionPageModule {}
