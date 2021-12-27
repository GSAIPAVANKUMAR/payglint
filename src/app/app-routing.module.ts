import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/index';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
  { path: 'axiom-test/dashboard/login', component: LoginComponent },
  { path: 'axiom-test/dashboard/signup', component: RegistrationComponent },
  { path: "", redirectTo: "axiom-test/dashboard/login", pathMatch: "full" },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
