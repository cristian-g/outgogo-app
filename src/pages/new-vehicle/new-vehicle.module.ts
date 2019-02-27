import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewVehiclePage } from './new-vehicle';

@NgModule({
  declarations: [
    NewVehiclePage,
  ],
  imports: [
    IonicPageModule.forChild(NewVehiclePage),
  ],
})
export class NewVehiclePageModule {}
