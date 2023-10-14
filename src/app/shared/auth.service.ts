import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router,private toastr: ToastrService) { }

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');
        this.router.navigate(['home']);

    }, err => {
        this.toastr.error(err.message);
        this.router.navigate(['/login']);
    })
  }

  // register method
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      this.toastr.success('Registration Successful');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/signup']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      this.toastr.error(err.message);
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/home']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }

}