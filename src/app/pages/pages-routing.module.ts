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

import { environment } from 'src/environments/environment';

const route_prefix = environment.routePrefix;

const routes: Routes = [
    {
        path: "",
        component: SideBarComponent,
        children: [
            // { path: route_prefix + "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
            { path: route_prefix + "events", component: EventComponent, canActivate: [AuthGuard] },
            { path: route_prefix + "screenevents", component: ScreenEventComponent, canActivate: [AuthGuard] },
            // { path: route_prefix + "reports", component: ReportsComponent, canActivate: [AuthGuard] },
            // { path: route_prefix + "analytics", component: AnalyticsComponent, canActivate: [AuthGuard] },
            // { path: route_prefix + "profilescreen", component: ProfileScreenComponent, canActivate: [AuthGuard] },
            // { path: route_prefix + "audittrails", component: AudittrialsComponent, canActivate: [AuthGuard] },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class PagesRoutingModule { }
