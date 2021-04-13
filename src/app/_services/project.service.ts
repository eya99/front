import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../entities/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiURL = 'http://localhost:3030/api/project/';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
  
  GetAllProjects(): Observable<Project> {
    return this.http.get<Project>(this.apiURL + 'getProjects').pipe(

    )
  }
  createProject(project): Observable<any> {
    return this.http.post(this.apiURL + 'createproject', {
      name: project.name,
      category: project.category,
      userId : project.userId,

    }, this.httpOptions);
  }
}


