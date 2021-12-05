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



@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
  ],
  imports: [  
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    MatTableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],  
  exports: [
    HomeComponent,
    ProfileComponent
  ],
})
export class HomeModule { }
