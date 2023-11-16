import { Component ,OnInit} from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
   email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private auth: AuthService, private router: Router ,private _toast:ToastrService) { }
   ngOnInit(): void {}

  login() {
    if (this.email === '' && this.password === '') {
      this._toast.error('Please fill the form');
      return;
    } else if (this.email === '') {
      this._toast.error('Please enter an email');
      return;
    } else if (this.password === '') {
      this._toast.error('Please enter a password');
      return;
    } else {
      this.auth.login(this.email, this.password);
      this.email = '';
      this.password = '';
      this.router.navigate(['/home'])
      this._toast.success('Successfully logged in!')
    } 
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signInWithGoogle() {
    this.auth.googlesignIn()
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error('Google login failed:', error);
      });
    
  }

}

