import { SavefilterComponent } from './pages/savefilter/savefilter.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator } from "@angular/material/paginator";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import  {MatStepperModule } from '@angular/material/stepper';
// import {CdkTableModule} from '@angular/cdk/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { LoginComponent } from './pages/modules/login/login.component';
import { HomeModule } from './pages/modules/home/home.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from "../app/pages/shared/service/material/material.module";

import { ApplicationService } from './pages/application.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PaginatorDirective } from './pagination.directive';
import { DashboardComponent } from './pages/modules/dashboard/dashboard.component';
import { CheckpopupComponent } from './pages/checkpopup/checkpopup.component';
import { MapComponent } from './pages/map/map.component';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginatorDirective,
    DashboardComponent,
    CheckpopupComponent,
    SavefilterComponent,
    MapComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // MatPaginator,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatToolbarModule,
    MatSidenavModule,
    MaterialModule,
    MatListModule,
    MatRadioModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatRippleModule,
    MatBadgeModule,
    MatMenuModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatExpansionModule,
    FlexLayoutModule,
    HomeModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAjeJEPREBQFvAIqDSZliF0WjQrCld-Mh0"
    }),
  ],
  entryComponents:[LoginComponent],
  providers: [ApplicationService,ToastrService],
  bootstrap: [AppComponent],
  exports: [PaginatorDirective]
})
export class AppModule { }
