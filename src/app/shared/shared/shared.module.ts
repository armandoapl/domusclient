import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker'
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TextInputComponent } from 'src/app/_forms/text-input/text-input.component';
import { DateInputComponent } from 'src/app/_forms/date-input/date-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
  declarations: [
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
  ],
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule
  ], 
  exports: [
    TabsModule,
    BsDatepickerModule,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    NgxGalleryModule
  ]
})
export class SharedModule { }
