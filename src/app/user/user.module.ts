import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from '../model/home/home.component';
import { UserformComponent } from '../model/userform/userform.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from '../model/navbar/navbar.component';
@NgModule({
  declarations: [
    HomeComponent,
    UserformComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton:true,
      timeOut:5000,
      progressBar:true
    }),
    NgxPaginationModule
  ]
})
export class UserModule { }