import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { WebRequestServiceService } from 'src/app/_services/web-request-service.service';
import { HttpClient , HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-forumlist',
  templateUrl: './forumlist.component.html',
  styleUrls: ['./forumlist.component.css']
})
export class ForumlistComponent implements OnInit {

  forumList: any;
  currentForum = null;
  currentIndex = -1;
  titre = '';
  id:any;
  images!:any;
  constructor(private authService : AuthService, private webService: WebRequestServiceService 
    ) { }

  ngOnInit(): void {
    this.retrieveTutorials();

    
  }
  retrieveTutorials(): void {
    this.authService.getAll()
      .subscribe(
        data => {
          this.forumList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  setActiveTutorial( forum: null, index: number ): void {
    this.currentForum = forum;
    this.currentIndex = index;
  }

  onaddreclamationbutton(nom : string , mail : string, tel : string , commentaire : string){
   
    this.webService.addReclamation(nom,mail,tel,commentaire).subscribe((res: HttpResponse<any>) => {
  
     
    console.log("saye");
     });
}
}
