import { ProfileScreenComponent } from './pages/profilescreen/profilescreen.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { HomeModule } from './pages/home/home.module';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PaginatorDirective } from './pagination.directive';
import { AgmCoreModule } from '@agm/core';
import { AudittrialsComponent } from './pages/audittrials/audittrials.component';
import { EventComponent } from './pages/event/event.component';
import { MaterialModule } from './angular-material-module';

import {
  CheckpopupComponent,
  SavefilterComponent,
  MapComponent,
  EdituserComponent,
  AddmodelComponent,
  // SideBarComponent,
} from './components/index';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginatorDirective,
    CheckpopupComponent,
    SavefilterComponent,
    MapComponent,
    ProfileScreenComponent,
    AddmodelComponent,
    EdituserComponent,
    AudittrialsComponent,
    EventComponent
  ],
  exports: [
    PaginatorDirective,
    CheckpopupComponent,
    SavefilterComponent,
    MapComponent,
    EdituserComponent,
    AddmodelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HomeModule,
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
