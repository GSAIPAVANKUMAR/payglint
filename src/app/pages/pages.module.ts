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
    MapComponent,
    EdituserComponent,
    AdduserComponent,
    SideBarComponent,
} from '../components/index';
import { PaginatorDirective } from 'src/app/pagination.directive';
import { AgmCoreModule } from '@agm/core';
import { SelectDropDownModule } from 'ngx-select-dropdown'

@NgModule({
    imports: [
        PagesRoutingModule,
        CommonModule,
        MaterialModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        SelectDropDownModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyAjeJEPREBQFvAIqDSZliF0WjQrCld-Mh0"
        }),
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
        MapComponent,
        EdituserComponent,
        AdduserComponent,
        SideBarComponent,
        RegistrationComponent,
        PaginatorDirective,
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
        MapComponent,
        EdituserComponent,
        AdduserComponent,
        SideBarComponent,
        PaginatorDirective,
    ],
})
export class PagesModule { }
