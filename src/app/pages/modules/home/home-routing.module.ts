import { EventComponent } from './../event/event.component';
import { AudittrialsComponent } from './../audittrials/audittrials.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "../../map/map.component";
import { AnalyticsComponent } from "../analytics/analytics.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ProfileComponent } from "../profile/profile.component";
import { ProfilescreenComponent } from "../profilescreen/profilescreen.component";
import { ReportsComponent } from "../reports/reports.component";
import { HomeComponent } from "./home.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "events", component: EventComponent },
      { path: "screenevents", component: ProfileComponent },
      { path: "reports", component: ReportsComponent },
      { path: "analytics", component: AnalyticsComponent },
      { path: "profilescreen", component: ProfilescreenComponent },
      { path: "audittrails", component: AudittrialsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
