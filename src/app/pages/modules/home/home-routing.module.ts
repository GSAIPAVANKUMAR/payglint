import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "../../map/map.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ProfileComponent } from "../profile/profile.component";
import { ProfilescreenComponent } from "../profilescreen/profilescreen.component";
import { HomeComponent } from "./home.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "screenevents", component: ProfileComponent },
      { path: "screenevents", component: MapComponent },
      { path: "profilescreen", component: ProfilescreenComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
