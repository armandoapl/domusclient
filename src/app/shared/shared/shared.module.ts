import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot()
  ], 
  exports: [
    TabsModule,
    BsDatepickerModule
  ]
})
export class SharedModule { }
