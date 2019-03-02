import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehiclePage } from './vehicle';

@NgModule({
  declarations: [
    VehiclePage,
  ],
  imports: [
    IonicPageModule.forChild(VehiclePage),
  ],
})
export class VehiclePageModule {}
