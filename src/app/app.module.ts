import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  LoginComponent,
} from './pages/index';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { MaterialModule } from './angular-material-module';

import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PagesModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAjeJEPREBQFvAIqDSZliF0WjQrCld-Mh0"
    }),
  ],
  entryComponents: [LoginComponent],
  providers: [ToastrService],
  bootstrap: [AppComponent],
})
export class AppModule { }
