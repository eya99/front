import { HttpClient , HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  title = 'fileUpload';
  images: any;
  multipleImages = [];
  evev: any;
  currentInput: Event | undefined;
  
  
  constructor(private authService : AuthService , 
    private http: HttpClient 
  ) { }

  ngOnInit(): void {
  }

  onAddForumButtonClicked(titre: string, description: string) {
    console.log( this.currentInput);
    const image = "aaaa";
    const file = this.evev.target.files[0];
    const formdata = new FormData();
    formdata.append('image', file);
    this.http.post('http://localhost:3000/file', formdata).subscribe(
      (d) => {
        console.log(d);
      },
      (error) => {
        console.error(error);
      }
    );

    this.authService.addForum(titre, description, file.name).subscribe((res: HttpResponse<any>) => {
      console.log("sayé");
    });
    

    
  }
  

  upload(event: any) {
    this.evev = event
  }

 
  

}
