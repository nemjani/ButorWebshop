import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentEmail?: string;
  currentId?: string;

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string) {
    this.currentEmail = email;

    return this.auth.signInWithEmailAndPassword(email, password);
  }

  singup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  getUserId() {
    return this.auth.user.pipe(
      map(user => user ? user.uid : null)
    );
  }
  
  getUsername() {
    return this.auth.user.pipe(
      map(user => user ? user.email : null)
    );
  }
  

}
