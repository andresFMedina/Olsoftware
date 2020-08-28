import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: AngularFireAuth) { }

  loginEmailAndPassword(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  getCurrentUser(){
    return this.auth.user;
  }
}
