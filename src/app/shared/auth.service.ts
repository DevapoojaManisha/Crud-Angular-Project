import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import firebase from "firebase/compat/app";
import { GoogleAuthProvider, GithubAuthProvider } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  appUser$ = this.fireauth.authState;
  


  constructor(private fireauth  : AngularFireAuth, private router : Router,
    private afs : AngularFirestore,private _toast:ToastrService,) { }

  //login method
  login(email: string, passsword: string) {
    const returnUrl=localStorage.getItem('returnUrl') || '/home';
    this.fireauth.signInWithEmailAndPassword(email,passsword).then(() =>{
      localStorage.setItem('token','true');


      this.fireauth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((credential) => this.updateUserData(credential.user));
      this._toast.success('Successfully logged in!');
      this.router.navigate(['/home'])
    }, err =>{
      alert('something went wrong');
      this.router.navigate(['/login']);
    })
  }


 


  // signup method
  signup(email: string, passsword : string) {
    this.fireauth.createUserWithEmailAndPassword(email, passsword).then(() => {
      this._toast.success('Registration Successful');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/signup']);
    })
  }


  // sign out
  logout() {
    console.log("Logging out...");
    this.fireauth.signOut().then(() => {
      this._toast.success("Successfully signed out.");
      localStorage.removeItem('token');
      this.router.navigate(["/login"]);
    }).catch(err => {
      console.error("Error while signing out:", err);
      alert(err.message);
    });
  }
  



googlesignIn(){
  return this.fireauth.signInWithPopup(new GoogleAuthProvider).then( () => {
 this.router.navigate(['/home']);
 localStorage.setItem('token','true');
  }, err => {
    alert(err.message)
  })
}


private updateUserData(user : any) {
  const userRef = this.afs.doc(`appusers/${user.id}`);
  const data = {
    name: user.displayName,
    email: user.email,
    
  };
  return userRef.set(data, { merge: true });
}


}