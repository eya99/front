import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';
import { Observable, throwError } from 'rxjs';import { WebRequestServiceService } from './web-request-service.service';
import { shareReplay, tap } from 'rxjs/internal/operators';
import * as shajs from "sha.js";
import { map } from 'rxjs/operators';
import { EmailValidator } from '@angular/forms';
const AUTH_API = 'http://localhost:3030/api/user/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri: any = "http://localhost:3030/api/profile";

  constructor(private http: HttpClient,private webService: WebRequestServiceService,) { }

  resetPasswordMail(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'resetPasswordMail', credentials, httpOptions);
  }
  verifCode(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'verifCode/' + credentials, null, httpOptions);
  }
  verifEmail(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'verifEmail', credentials, httpOptions);
  }
  updatePassword(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'updatePassword', credentials, httpOptions);
  }
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }
  downloadMedia(fileName  : any): Observable<Blob> {
  return this.http.get(
    ` ${this.uri}/download/` + fileName,
      {
          responseType: "blob",
      }
  );
}
  loginGoogle(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'loginGoogle/' + credentials, null, httpOptions);
  }


  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      name:user.name,
      prenom:user.prenom,
      email: user.email,
      password: user.password,
      roles : "Client"
    }, httpOptions);
  }

socialLog(data:any){
  return this.http.post<any>(`${AUTH_API}socauth`, {
    nom:data.nom,
    email:data.email,
prenom:data.prenom,
image:data.image,

  });
}
resendEmail(id: any) {

  return this.http.get<any>(`${AUTH_API}${id}`);

}
verificationAcccount(id: any, data: any) {
  return this.http.patch<any>(`${AUTH_API}${id}`, {
    code: data.code
  })
}
addForum(titre: string, description: string, image:any) {
  return this.webService.addForum(titre, description,image).pipe(
    shareReplay(),
    tap((res: HttpResponse<any>) => {
      // the auth tokens will be in the header of this response

    })
  )
}
hashPassword(password: any) {
  return shajs("sha256").update(password).digest("hex");
}
changePwd(pwd: any, id: any) {
  console.log(pwd, id);
  let hash = this.hashPassword(pwd);
  return this.http.patch<any>(`${this.uri}/users/${id}`, {
    password: hash
  })
}
postFile(fileToUpload: File) {
  const formData: FormData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);
  return this.http.post<any>(
    'http://localhost:3030/api/profile/file',
    formData,

  );
}

updateProfile(id:any,data:any){
  console.log(data.nom)
  return this.http.patch<any>(`${this.uri}/${id}`, {
    name:data.nom,
  email:data.email,
prenom:data.prenom,
password:data.password,
image:data.image,
   })

}
profile(file): Observable<any> {
  const header = new HttpHeaders();
  const options = {
    reportProgress: true,
    headers: header
  };
  return this.http.post(AUTH_API + 'profile', file, options);
}
getAll() {
  return this.webService.getAll();
}




  getAllUsers(): Observable<any> {
    return this.http.post(`${this.uri}/users/${"Client"}`, {
    roles: "Client",
    }, httpOptions);
  }

  delete(user) {
    return this.http.post(`${this.uri}/delete`, {
      title : user.name,
      start : user.prenom,
      end : user.end,
      meta : {

      },
      color : {

      }
    },httpOptions);
  }
    deleteImportantNote(id,email){
      return this.http.delete('http://localhost:3030/api/user/delete/'+id+'/'+email);

}

UpdateImportantNote(id){
  return this.http.post<any>(`${AUTH_API}disable/${id}/${"false"}`, {
    verified: "false"
  })
}
UpdateImportantEnable(id){
  return this.http.post<any>(`${AUTH_API}enable/${id}/${"true"}`, {
    verified: "true"
  })
}
}
