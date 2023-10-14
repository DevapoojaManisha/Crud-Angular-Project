import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService, private router : Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {

    if(this.email == ''||this.password == ''){
      this.toastr.error('Please enter the fields')
    }
    else if(this.email == '') {
      this.toastr.error('Please enter email');
      return;
    }else if(this.password == '') {
      this.toastr.error('Please enter password');
      return;
    }
    else{

    this.auth.login(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }
}

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
 
}