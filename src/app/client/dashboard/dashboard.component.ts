import { TokenStorageService } from './../../_services/token-storage.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { User } from 'src/app/entities/user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private loggeduser: User;
  username ='';
  dash='';

constructor( private tokenStorage: TokenStorageService,
  private router: Router,
  private socialService: SocialAuthService) { }

onIconDash() {
  this.dash='app-icon-dash';
}
onSplashDash(){
  this.dash='app-splash-dash';
}
ondata(){
  this.dash='app-database';
}
onprofile(){
  this.dash='app-profile-client';
}



logOut(){
  console.log("hello world")
  this.tokenStorage.signOut()

  this.router.navigate(['']);

}








  ngOnInit(): void {

    this.loggeduser=this.tokenStorage.getUser();
    console.log(this.tokenStorage.getUser())
    this.username=this.loggeduser[Object.keys(this.loggeduser)[1]];

    this.dash='app-icon-dash'
  }

}
