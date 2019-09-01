import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpTextPage } from './help-text';

@NgModule({
  declarations: [
    HelpTextPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpTextPage),
  ],
})
export class HelpTextPageModule {}
