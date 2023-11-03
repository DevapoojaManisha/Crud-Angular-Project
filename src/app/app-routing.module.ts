import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { HomeComponent } from './model/home/home.component'; 
import { UserformComponent } from './model/userform/userform.component';
import { AuthClassGuard } from './shared/auth-class.guard';
import { LoginSignupComponent } from './user/login-signup/login-signup.component';



const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {
    path:'login',
    component:LoginSignupComponent,
  },
  {
    path:'signup',
    component:LoginSignupComponent,
   
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthClassGuard]
  },
  
  {
    path:'userform/add',
    component:UserformComponent,
    canActivate: [AuthClassGuard]
  },
  {
    path:'userform/edit/:id',
    component: UserformComponent,
    canActivate: [AuthClassGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   providers: [AuthClassGuard] 
})
export class AppRoutingModule { }