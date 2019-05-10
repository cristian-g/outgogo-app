import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ActionsPage} from "./actions";

@NgModule({
  declarations: [
    ActionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ActionsPage),
  ],
})
export class ActionsPageModule {}
