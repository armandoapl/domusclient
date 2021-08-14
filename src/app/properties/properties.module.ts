import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from './property-card/property-card.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyUploadComponent } from './proprty-upload/property-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared/shared.module';
import { PropertyEditComponent } from './property-edit/property-edit.component';



@NgModule({
  declarations: [
    PropertyCardComponent,
    PropertyDetailComponent,
    PropertyListComponent,
    PropertyUploadComponent,
    PropertyEditComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [PropertyCardComponent],
})
export class PropertiesModule { }
