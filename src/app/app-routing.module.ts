import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { HomeComponent } from './model/home/home.component'; 
import { UserformComponent } from './model/userform/userform.component';
import { AuthGuard } from './shared/auth.guard';



const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'signup',
    component:SignupComponent,
   
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path:'userform/add',
    component:UserformComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'userform/edit/:id',
    component: UserformComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   providers: [AuthGuard] 
})
export class AppRoutingModule { }