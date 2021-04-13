import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entities/user';
import { Comment } from 'src/app/entities/Comment';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { WebRequestServiceService } from 'src/app/_services/web-request-service.service';

@Component({
  selector: 'app-detailforum',
  templateUrl: './detailforum.component.html',
  styleUrls: ['./detailforum.component.css']
})
export class DetailforumComponent implements OnInit {
  forumid;
  detail:any;
  comment = "";
  postComment : string[] = [];
  private loggeduser: User;
  cc = '';
  commentObj : Comment[] = [];
  titre;
   public data: any = [];
  constructor(private activatedRoute: ActivatedRoute,private webService: WebRequestServiceService, private router : Router,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.loggeduser = this.tokenStorage.getUser();
    this.cc = this.loggeduser[Object.keys(this.loggeduser)[1]];
    console.log('this is the user email ' + this.cc);

    this.activatedRoute.paramMap.subscribe(result => {
      this.forumid=result.get('forumid');
       this.webService.getforumdetail(String(this.forumid)).subscribe(data => {
        this.detail = data;
        console.log("forumid:",this.forumid);
        // console.log("forumid:",data);
        console.log("data:",this.detail);
        

    })
  
   })
  this.getProducts();
  }
  getProducts(): void {
    this.webService.getCommentsByForum(this.forumid).subscribe((resp: any) => {
      this.commentObj = resp;
      console.log(this.commentObj);
    });
  }

  onaddcommentbutton(titre : string , idforum : string , username : string){
    this.activatedRoute.paramMap.subscribe(result => {
    this.forumid=result.get('forumid');

    this.webService.addcomment(titre,idforum,username).subscribe((res: HttpResponse<any>) => {
     idforum = this.forumid;
     username = this.cc
     if(this.comment!=null)  
                    {  
                        this.postComment.push(this.comment);  
                        this.comment = "";  
                    }  
     
    });
    console.log(this.comment);
  })
}





  ondelete(id : string) {
    if(confirm('are you sure to delete ?? ')){
      this.webService.deleteForum(id).subscribe(res=>{
           console.log("good")
      });
    }
  }


  

}

  

  
