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
            { path: "axiom-test/dashboard/dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
            { path: "axiom-test/dashboard/events", component: EventComponent, canActivate: [AuthGuard] },
            { path: "axiom-test/dashboard/screenevents", component: ScreenEventComponent, canActivate: [AuthGuard] },
            { path: "axiom-test/dashboard/reports", component: ReportsComponent, canActivate: [AuthGuard] },
            { path: "axiom-test/dashboard/analytics", component: AnalyticsComponent, canActivate: [AuthGuard] },
            { path: "axiom-test/dashboard/profilescreen", component: ProfileScreenComponent, canActivate: [AuthGuard] },
            { path: "axiom-test/dashboard/audittrails", component: AudittrialsComponent, canActivate: [AuthGuard] },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class PagesRoutingModule { }
