import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/modules/login/login.component';
import { HomeComponent } from '././pages/modules/home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: "home",
    loadChildren: "../app/pages/modules/home/home.module#HomeModule",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
