import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/index';
import { RegistrationComponent } from './pages/registration/registration.component';
import { environment } from 'src/environments/environment';

const route_prefix = environment.routePrefix;

const routes: Routes = [
  { path: route_prefix + 'login', component: LoginComponent },
  { path: route_prefix + 'signup', component: RegistrationComponent },
  { path: "", redirectTo: route_prefix + "login", pathMatch: "full" },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
