import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      this.toastr.error('Please enter email');
      return;
    }

    if(this.password == '') {
      this.toastr.error('Please enter password');
      return;
    }

    this.auth.register(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }

}