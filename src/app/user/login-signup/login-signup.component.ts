import { Component ,OnInit} from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
  animations: [
    trigger('moveButton', [
      state('login', style({ transform: 'translateX(0)' })),
      state('signup', style({ transform: 'translateX(45%)' })),
      transition('* => *', animate('0.5s'))
    ])
  ]
})
export class LoginSignupComponent implements OnInit{
  email: string = '';
  password: string = '';
  mode: 'login' | 'signup' = 'login';
  showPassword: boolean = false;
  

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.email === '') {
      alert('Please enter an email');
      return;
    }

    if (this.password === '') {
      alert('Please enter a password');
      return;
    }

    if (this.mode === 'login') {
      this.auth.login(this.email, this.password);
    } else {
      this.auth.signup(this.email, this.password);
    }

    this.email = '';
    this.password = '';
    this.mode === 'login' ? this.router.navigate(['/home']) : this.router.navigate(['/login']);
  }

  /*toggleMode(newMode: 'login' | 'signup') {
  this.mode = newMode;
  }*/
  
  toggleMode() {
  this.mode = this.mode === 'login' ? 'signup' : 'login';
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
