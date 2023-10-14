import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './component/login/login.component';


import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
   {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component : LoginComponent},
  {path: 'home', component : HomeComponent},
  {path: 'signup', component : SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }