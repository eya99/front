import { User } from './../../entities/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  private loggeduser : User
   
  constructor(private router: Router , private tokenStorage: TokenStorageService ) { }

  ngOnInit(): void {
    this.loggeduser = this.tokenStorage.getUser();
    var bb = this.loggeduser[Object.keys(this.loggeduser)[0]];
            console.log("this is the user email "+bb);
  }
  btnClick= function () {
    this.router.navigate(['/step2']);
  }

}
