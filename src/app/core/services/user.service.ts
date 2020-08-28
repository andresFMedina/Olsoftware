import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    return this.firestore.collection<User>('user').snapshotChanges();
  }

  getUserByUid(uid: string) {
    return this.firestore.collection('user').doc(uid).snapshotChanges();
  }

  createUser(user: User) {
    return this.firestore.collection('user').add(user);
  }

  updateUser(user: User, uid: string) {
    return this.firestore.collection<User>('user').doc(uid).update(user);
  }

  deleteUser(uid: string){
    return this.firestore.collection('user').doc(uid).delete();
  }
}

