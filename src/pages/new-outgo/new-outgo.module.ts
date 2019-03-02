import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewOutgoPage } from './new-outgo';

@NgModule({
  declarations: [
    NewOutgoPage,
  ],
  imports: [
    IonicPageModule.forChild(NewOutgoPage),
  ],
})
export class NewOutgoPageModule {}
