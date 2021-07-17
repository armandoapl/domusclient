import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MessagesComponent } from './messages/messages.component';
import { ToastrModule } from 'ngx-toastr';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { PropertyDetailComponent } from './properties/property-detail/property-detail.component';
import { PropertyListComponent } from './properties/property-list/property-list.component';
import { AgentListComponent } from './agents/agent-list/agent-list.component';
import { AgentCardComponent } from './agents/agent-card/agent-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { AgentDetailComponent } from './agents/agent-detail/agent-detail.component';
import { CarrouselComponent } from './shared/carrousel/carrousel.component';
import { AgentEditComponent } from './agents/agent-edit/agent-edit.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PropertyCardComponent } from './properties/property-card/property-card.component';
import { SharedModule } from './shared/shared/shared.module';
import { PhotoEditorComponent } from './agents/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { PropertyUploadComponent } from './properties/proprty-upload/property-upload.component';
import { PropertyPhotoUploadComponent } from './properties/property-photo-upload/property-photo-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    PropertyDetailComponent,
    PropertyListComponent,
    AgentListComponent,
    AgentCardComponent,
    AgentDetailComponent,
    CarrouselComponent,
    AgentEditComponent,
    PropertyCardComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    PropertyUploadComponent,
    PropertyPhotoUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(
      {
        positionClass: "toast-bottom-right",
        timeOut: 1800,
      },
    ),
    CarouselModule.forRoot(),
    NgxSpinnerModule, 
    SharedModule,
    FileUploadModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
