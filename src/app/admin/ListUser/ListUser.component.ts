import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-ListUser',
  templateUrl: './ListUser.component.html',
  styleUrls: ['./ListUser.component.scss']
})
export class ListUserComponent implements OnInit {
  users: any;
  test:any;
 btnDisabled="false";
  constructor(private router: Router, private userService:AuthService) { }

  ngOnInit(): void {

    this.retrieveTutorials();
if (this.users==""){
  console.log("erreur")
}

  }
  retrieveTutorials(): void {
    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.users = data;
          if(this.users.verified ==true)
          {this.test=true}
          console.log(this.users);
        },
        error => {
          console.log(error);
        });
  }
  remove(i){
    const index = this.users.indexOf(i);
    this.userService.delete(index)
    .subscribe(
      data => {
        this.users = data;
        console.log(this.users);
      },
      error => {
        console.log(error);
      });
}
deleteImportantNote(id,email){
console.log(id)
  this.userService.deleteImportantNote(id,email)
    .subscribe(
      data => {
        this.users = data;
        console.log(this.users);
      },
      error => {
        console.log(error);
      });
}
UpdateImportantNote(id){
  this.btnDisabled="true"
  console.log(id)
    this.userService.UpdateImportantNote(id)
      .subscribe(
        data => {
          this.users = data;
          console.log(this.users);
        },
        error => {
          console.log(error);
        });
  }
  UpdateImportantEnable(id){
    console.log(id)
      this.userService.UpdateImportantEnable(id)
        .subscribe(
          data => {
            this.users = data;
            console.log(this.users);
          },
          error => {
            console.log(error);
          });
    }
}
