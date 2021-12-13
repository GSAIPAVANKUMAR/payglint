import { ProfileComponent } from './../profile/profile.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from '../../shared/service/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { PaginatorDirective } from 'src/app/pagination.directive';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReportsComponent } from '../reports/reports.component';
import { AnalyticsComponent } from '../analytics/analytics.component';
// import { ProfilescreenComponent } from '../profilescreen/profilescreen.component';



@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    ReportsComponent,
    AnalyticsComponent,
    // ProfilescreenComponent
  ],
  imports: [  
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    MatTableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ],  
  exports: [
    HomeComponent,
    ProfileComponent,
    // ProfilescreenComponent
  ],
})
export class HomeModule { }
