import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TosTextPage } from './tos-text';

@NgModule({
  declarations: [
    TosTextPage,
  ],
  imports: [
    IonicPageModule.forChild(TosTextPage),
  ],
})
export class TosTextPageModule {}
