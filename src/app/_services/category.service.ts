import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../entities/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  apiURL = 'http://localhost:3030/api/category/';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
  
  GetAllCategories(): Observable<Category> {
    return this.http.get<Category>(this.apiURL + 'getCategories').pipe(

    )
  }
}
