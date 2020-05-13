import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get isAuthenticated(): boolean {
    if (localStorage.getItem('currentUser')){
      return true;
    } else {
      return false
    }
  }

  login(user: User) {
    if(user.username === 'admin' && user.password === 'admin123'){
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      throw Error('Invalid Credentials!')
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
