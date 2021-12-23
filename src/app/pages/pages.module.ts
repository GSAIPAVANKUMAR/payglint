import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/angular-material-module';

import { PagesRoutingModule } from './pages-routing.module';
import {
    ReportsComponent,
    AnalyticsComponent,
    DashboardComponent,
    ScreenEventComponent,
    AudittrialsComponent,
    EventComponent,
    ProfileScreenComponent,
    RegistrationComponent,
} from './index'

import {
    CheckpopupComponent,
    SavefilterComponent,
    // MapComponent,
    EdituserComponent,
    AddmodelComponent,
    SideBarComponent,
} from '../components/index';

@NgModule({
    imports: [
        PagesRoutingModule,
        CommonModule,
        MaterialModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
    ],
    declarations: [
        ReportsComponent,
        AnalyticsComponent,
        DashboardComponent,
        ScreenEventComponent,
        AudittrialsComponent,
        EventComponent,
        ProfileScreenComponent,
        CheckpopupComponent,
        SavefilterComponent,
        // MapComponent,
        EdituserComponent,
        AddmodelComponent,
        SideBarComponent,
        RegistrationComponent,
    ],
    exports: [
        ReportsComponent,
        AnalyticsComponent,
        DashboardComponent,
        ScreenEventComponent,
        AudittrialsComponent,
        EventComponent,
        ProfileScreenComponent,
        CheckpopupComponent,
        SavefilterComponent,
        // MapComponent,
        EdituserComponent,
        AddmodelComponent,
        SideBarComponent,
    ],
})
export class PagesModule { }
