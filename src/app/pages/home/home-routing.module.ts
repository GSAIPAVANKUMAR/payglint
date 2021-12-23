import { EventComponent } from './../event/event.component';
import { AudittrialsComponent } from './../audittrials/audittrials.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnalyticsComponent } from "../analytics/analytics.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ProfileScreenComponent } from "../profilescreen/profilescreen.component";
import { ReportsComponent } from "../reports/reports.component";
import { HomeComponent } from "./home.component";
import { ScreenEventComponent } from '../screen-event/screen-event.component';
import { AuthGuard } from 'src/app/helpers/auth.guard';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
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
export class HomeRoutingModule { }
