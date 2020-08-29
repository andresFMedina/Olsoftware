import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: AngularFireAuth) { }

  singupWithEmailAndPassword(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  loginEmailAndPassword(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  getCurrentUser(){
    return this.auth.user;
  }

  logout(){
    return this.auth.signOut();
  }
}
