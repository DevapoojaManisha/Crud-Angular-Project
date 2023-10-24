import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable ,from} from 'rxjs';
import { map } from 'rxjs/operators'; // Import 'map' from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly angularFireStore: AngularFirestore) { }

  saveUser(user: User) {
    const userData = JSON.parse(JSON.stringify(user));
    return this.angularFireStore.collection("user").add(userData).then(docRef=>{
      userData.id=docRef.id;
    docRef.update(userData);
    })
  
  }

  getAllUser(): Observable<User[]> {
    const userList = this.angularFireStore
      .collection<User>("user", (ref) => ref.orderBy("name"))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((c) => {
            const data = c.payload.doc.data();
            const userId = c.payload.doc.id;
            return { userId, ...data };
          });
        })
      );
    return userList;
  }

  getUserId(userId: string): Observable<User | null> {
    return this.angularFireStore.collection("user").doc(userId).valueChanges() as Observable<User | null>;
  }
  

  update(userId: string, user: User) {
    const userData = JSON.parse(JSON.stringify(user));
    return this.angularFireStore.collection("user").doc(userId).update(userData);
  }

  deleteUser(userId: string): Observable<void> {
    return from(this.angularFireStore.collection("user").doc(userId).delete());
  }
  
}
