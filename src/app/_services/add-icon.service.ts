import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddIconService {
  apiURL = 'http://localhost:3030/api/project/';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 

  createIcon(projectname,iconDataUrl): Observable<any> {
    return this.http.post(this.apiURL + 'project_icon', {
      projectname: projectname,
      iconDataUrl: iconDataUrl,
    }, this.httpOptions);
  }
}
