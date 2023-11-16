import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  appUser$ = this.fireauth.authState;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private _toast: ToastrService
  ) {}

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      this.fireauth.authState.subscribe((user: firebase.User | null) => {
        resolve(user !== null);
      });
    });
  }

  // Login method
  login(email: string, password: string) {
    const returnUrl = localStorage.getItem('returnUrl') || '/home';
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this._toast.success('Successfully logged in!');
        this.router.navigate(['/home']);
      },
      (err) => {
        alert('something went wrong');
        this.router.navigate(['/login']);
      }
    );
  }

  // Google sign-in method
  googlesignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
      (credential) => {
        this.updateUserData(credential.user);
        this._toast.success('Successfully logged in with Google!');
        this.router.navigate(['/home']);
        localStorage.setItem('token', 'true');
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  // Signup method
  signup(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        this._toast.success('Registration Successful');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/signup']);
      }
    );
  }

  // Sign out method
  logout() {
    this.fireauth.signOut().then(
      () => {
        this._toast.success('Successfully signed out.');
        localStorage.removeItem('token');
        this.router.navigate(['/homepage']);
      },
      (err) => {
        console.error('Error while signing out:', err);
        alert(err.message);
      }
    );
  }

  private updateUserData(user: any) {
    const userRef = this.afs.doc(`appusers/${user.id}`);
    const data = {
      name: user.displayName,
      email: user.email
    };
    return userRef.set(data, { merge: true });
  }
}
