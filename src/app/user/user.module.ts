import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from '../model/home/home.component';
import { UserformComponent } from '../model/userform/userform.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginSignupComponent } from './login-signup/login-signup.component';
@NgModule({
  declarations: [
    HomeComponent,
    UserformComponent,
    LoginSignupComponent
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