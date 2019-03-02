import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehiclesListPage } from './vehicles-list';

@NgModule({
  declarations: [
    VehiclesListPage,
  ],
  imports: [
    IonicPageModule.forChild(VehiclesListPage),
  ],
})
export class VehiclesListPageModule {}
