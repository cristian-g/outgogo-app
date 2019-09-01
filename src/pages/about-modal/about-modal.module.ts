import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutModalPage } from './about-modal';

@NgModule({
  declarations: [
    AboutModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutModalPage),
  ],
})
export class AboutModalPageModule {}
