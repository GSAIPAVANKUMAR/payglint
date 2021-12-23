import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from 'src/app/helpers/auth.guard';

import { SideBarComponent } from "../components/sidebar/sidebar.component";

import {
    ReportsComponent,
    AnalyticsComponent,
    DashboardComponent,
    ScreenEventComponent,
    AudittrialsComponent,
    EventComponent,
    ProfileScreenComponent,
} from './index'


const routes: Routes = [
    {
        path: "",
        component: SideBarComponent,
        children: [
            { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
            { path: "events", component: EventComponent, canActivate: [AuthGuard] },
            { path: "screenevents", component: ScreenEventComponent, canActivate: [AuthGuard] },
            { path: "reports", component: ReportsComponent, canActivate: [AuthGuard] },
            { path: "analytics", component: AnalyticsComponent, canActivate: [AuthGuard] },
            { path: "profilescreen", component: ProfileScreenComponent, canActivate: [AuthGuard] },
            { path: "audittrails", component: AudittrialsComponent, canActivate: [AuthGuard] },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class PagesRoutingModule { }
