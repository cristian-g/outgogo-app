import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutTextPage } from './about-text';

@NgModule({
  declarations: [
    AboutTextPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutTextPage),
  ],
})
export class AboutTextPageModule {}
