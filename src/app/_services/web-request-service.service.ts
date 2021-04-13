import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WebRequestServiceService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) { this.ROOT_URL = 'http://localhost:3030'; }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
  addForum(titre: string, description: string , image:any) {
    return this.http.post(`${this.ROOT_URL}/Pforum`, {
      titre,
      description,
      image
      
    }, {
        observe: 'response'
      });
  }
  addcomment(titre: string , idforum : string, username : string) {
    return this.http.post(`${this.ROOT_URL}/Ppublication`, {
      titre,
      idforum,
      username
     
      
    }, {
        observe: 'response'
      });
  }
  addReclamation(nom: string, mail: string , tel: string, commentaire: string) {
    return this.http.post(`${this.ROOT_URL}/Preclamation`, {
      nom,
      mail,
      tel,
      commentaire
      
    }, {
        observe: 'response'
      });
  }
  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }
    private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/getAllForum`);
  }
  getCommentsByForum(idForum):Observable<any>{
    return this.http.post(this.ROOT_URL +'/getcommentsByForum', {
      forumId : idForum

    }).pipe(
      map(this.extractData),
      catchError(this.handleError)
    ); 
  }
  getimage(){
    return this.http.get<any[]>(`${this.ROOT_URL}/file/:fileName`);



  }
  getforumdetail(forumid:String){
    return this.http.get<any>(`${this.ROOT_URL}/`+forumid);
  }

  




  deleteForum(id: string){
    return this.http.delete(`${this.ROOT_URL}/ `+ id);
  }

 
 
  
}