import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private user: any;
  constructor(private cookie: CookieService,private router:Router) { }

  signOut() {
    this.cookie.delete('TOKEN_KEY', '/');
    this.cookie.deleteAll('/');
    this.cookie.deleteAll('/', 'localhost');

  }

  logOut() {
    localStorage.removeItem("token");
    this.cookie.delete('TOKEN_KEY', '/');
    this.cookie.deleteAll('/');
    this.cookie.deleteAll('/', 'localhost');

  }

  public saveToken(token: string) {
    const dateNow = new Date();
    dateNow.setMinutes(dateNow.getMinutes() + 59);
    this.cookie.delete(TOKEN_KEY);
    this.cookie.set(TOKEN_KEY, token, dateNow, '/',  'localhost', false, 'Lax');

  }

  public getToken(): string {
    return this.cookie.get(TOKEN_KEY);
  }

  public saveUser(user) {
    const dateNow = new Date();
    dateNow.setMinutes(dateNow.getMinutes() + 59);
    this.cookie.set(TOKEN_KEY, JSON.stringify(user), dateNow, '/', 'localhost', false, 'Lax');

  }
  isLoggedIn() {
    return !!localStorage.getItem("token") && !!this.user;
  }




  public getUser() {
    if (this.cookie.get(TOKEN_KEY)) {
      return JSON.parse(this.cookie.get(TOKEN_KEY));
    } else {
        return {roles: ''};
    }
  }

  public isloggedin(): boolean {
    return !!this.cookie.get(TOKEN_KEY);

  }
}
