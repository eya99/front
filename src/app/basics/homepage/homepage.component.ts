import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  LoginForm: FormGroup
  errorMessage = '';
  user: any;
  loggedIn: boolean=false;
  constructor(
    private socialService: SocialAuthService,

    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private tokenStorage:TokenStorageService,


  ) {
    let formControls = {


      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),

    }

    this.LoginForm = this.fb.group(formControls)
   }
   get email() { return this.LoginForm.get('email') }
  get password() { return this.LoginForm.get('password') }

  ngOnInit(): void {

  }
  onSubmit() {
    if (this.LoginForm.valid){
      this.authService.login(this.LoginForm.value).subscribe( data => {
        console.log(data._id)
        const id = data._id;
        if (data.roles === 'Client'){
            this.router.navigate(['/step1' , id]);
              console.log(data.roles);
              this.tokenStorage.saveToken(data.accessToken);
                  this.tokenStorage.saveUser(data);
                  console.log(data);
        }
        else{

            this.router.navigate(['Admin/dashboard' ]);
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
            console.log(data);
        }
        },
        err => {
          this.errorMessage = err.error.message;

        }
      );
    }
        // this.authService.login(this.LoginForm.value).subscribe(
        //   data => {

        //       const id = data._id;
        //       console.log(data.roles)
        //       if (data.roles='Client'){
        //       const id = data._id;



        //       this.tokenStorage.saveToken(data.accessToken);
        //       this.tokenStorage.saveUser(data);
        //     console.log(data);
        //     console.log(data);
        //     this.router.navigate(['/step1',id]);
        //   }},
        // //   else if (data.roles="Admin"){

        // //     const id = data._id;

        // //     this.tokenStorage.saveToken(data.accessToken);
        // //     this.tokenStorage.saveUser(data);
        // //   console.log(data);console.log(data);
        // //   this.router.navigate(['/step1',id]);
        // // }},
        //           err => {
        //     this.errorMessage = err.error.message;
        // }

        // );
    }
    signInWithGoogle(): void {
      this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.socialService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);

        let data={
          nom:this.user.firstName,
          prenom:this.user.lastName,
          email:this.user.email,
          image:this.user.photoUrl
        }
        this.authService.socialLog(data).subscribe((res)=>{

          const id = res._id;
        console.log("2")
console.log(res)
if (res.roles="Client"){
            this.tokenStorage.saveToken(res.accessToken);
            this.tokenStorage.saveUser(res);;
            console.log(this.tokenStorage.getToken())
            console.log(this.tokenStorage.getUser())
            this.router.navigate(['/step1',id]);
   }   err => {
    this.errorMessage = err.error.message;
}

         })
      });

    }

    signInWithFB(): void {

      this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID);
      this.socialService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);

        let data={
          nom:this.user.firstName,
          prenom:this.user.lastName,
          email:this.user.email,
          image:this.user.photoUrl
        }
        this.authService.socialLog(data).subscribe((res)=>{
          const id = res._id;
        console.log("2")
console.log(res)
if (res.roles="Client"){
            this.tokenStorage.saveToken(res.accessToken);
            this.tokenStorage.saveUser(res);;
            console.log(this.tokenStorage.getToken())
            console.log(this.tokenStorage.getUser())
            this.router.navigate(['/step1',id]);
   }   err => {
    this.errorMessage = err.error.message;
  }

})
});

}
}
