import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserformComponent } from '../model/userform/userform.component'; 

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  
  {
    path:'userform/add',
    component:UserformComponent
  },
  {
    path:'userform/edit/:id',
    component:UserformComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }