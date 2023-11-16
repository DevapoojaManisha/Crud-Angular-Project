import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { HomeComponent } from './model/home/home.component'; 
import { UserformComponent } from './model/userform/userform.component';
import { HomepageComponent } from './user/homepage/homepage.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { authGuard } from './shared/auth.guard';



const routes: Routes = [
  {path: '', redirectTo:'homepage', pathMatch:'full'},
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
   
  },
  {
    path: 'homepage',
    component:HomepageComponent
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  
  {
    path:'userform/add',
    component: UserformComponent,
    canActivate:[authGuard]
  },
  {
    path:'userform/edit/:id',
    component: UserformComponent,
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   providers: [] 
})
export class AppRoutingModule { }