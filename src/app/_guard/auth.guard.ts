import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { truncate } from 'lodash';
import { TokenStorageService } from './../_services/token-storage.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private token : TokenStorageService,
  private route : Router){}


  canActivate(): boolean{
    console.log(this.token.isloggedin())
    if (this.token.getToken())
{
  return true;
}else
{
  this.route.navigate(['/']);
  return false;
}
  }

}
