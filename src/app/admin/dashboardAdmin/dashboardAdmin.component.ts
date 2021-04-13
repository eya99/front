import { TokenStorageService } from './../../_services/token-storage.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/entities/user';
@Component({
  selector: 'app-dashboardAdmin',
  templateUrl: './dashboardAdmin.component.html',
  styleUrls: ['./dashboardAdmin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

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
  this.dash='app-profileadmin';
}


onListUser(){
  this.dash='app-ListUser';
}

logOut(){
  console.log("hello world")
  this.tokenStorage.signOut()

  this.router.navigate(['']);

}
ngOnInit(): void {

  this.loggeduser=this.tokenStorage.getUser();
  this.username=this.loggeduser[Object.keys(this.loggeduser)[1]];
console.log(this.username)
  this.dash='app-profileadmin'
}
}
