import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.scss']
})
export class ProfileClientComponent implements OnInit {

  user:any;
  _id:any;
  registerForm: FormGroup;

    constructor(private router: Router, private userService:AuthService,

private tokenstorage:TokenStorageService,
      private actiVrouter: ActivatedRoute,
      private fb: FormBuilder,
      private sanitizer: DomSanitizer
      ) {
        this.user=this.tokenstorage.getUser();

        console.log("formcontrol",this.user)
        let formControls = {

          nom: new FormControl(this.user.name,[
            Validators.required,
          ]),
          prenom: new FormControl(this.user.prenom,[
            Validators.required,
            Validators.minLength(2)
          ]),
          email: new FormControl(this.user.email,[
            Validators.required,
            Validators.email
          ]),
          password: new FormControl('',[
            Validators.required,
            Validators.minLength(6)
          ]),
          confirm: new FormControl('',[
            Validators.required,
            Validators.minLength(6)
          ]),
          curentpwd: new FormControl('',[
            Validators.required,
            Validators.minLength(6)
          ]),

        }

        this.registerForm = this.fb.group(formControls)

       }
       dashb(){

        this.router.navigate(['/admin']);


       }
    ngOnInit(): void {
      this.user=this.tokenstorage.getUser();
      console.log(this.user);
      if(this.user.image){
        this.userService
        .downloadMedia(this.user.image)
        .subscribe((blob) => {
            var myFile = blobToFile(blob, "my-image1.png");
            this.files.push(myFile)
            const objectURL = URL.createObjectURL(blob);
            const img = this.sanitizer.bypassSecurityTrustUrl(objectURL);

            this.user.image = objectURL
        })
  }
      }
      getSafeUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.user.image);
  }

    files: File[] = [];

    onSelect(event:any) {
      console.log(event);
      this.files.push(...event.addedFiles);
    }
    onRemove(event:any) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
    }
    logOut(){
      console.log("hello world")
      // this.userService.logOut()
      this.router.navigate(['']);

    }
    profile(){
      this.router.navigate(['/profile']);

    }

    login(){
      if(this.files.length>0){
        this.userService.postFile(this.files[0]).subscribe(resu=>{
          console.log(resu)
          let datapwd=null;
          let id=this.user._id;
          let  curentpwd=this.registerForm.controls["curentpwd"].value
          let password= this.registerForm.controls["password"].value
          let confirm=this.registerForm.controls["confirm"].value
          if(password!=''&&password!=null&&this.user.password==this.userService.hashPassword(curentpwd)&&password==confirm){
            datapwd= this.userService.hashPassword(this.registerForm.controls["password"].value)

         }
           let data={
            image : resu.img,
         email:this.registerForm.controls["email"].value,
          nom:this.registerForm.controls["nom"].value,
          password:datapwd,
          prenom:this.registerForm.controls["prenom"].value,
           }
         this.userService
         this.userService.updateProfile(id,data).subscribe((res)=>{
           console.log('id',res);

         this.user=res;
         if(this.user.image){
          this.userService
          .downloadMedia(this.user.image)
          .subscribe((blob) => {
              var myFile = blobToFile(blob, "my-image1.png");
              const objectURL = URL.createObjectURL(blob);
              const img = this.sanitizer.bypassSecurityTrustUrl(objectURL);

              this.user.image = objectURL
          })
    }
         })
        })
      }else{
        let datapwd=null;

        let id=this.user._id;
        let  curentpwd=this.registerForm.controls["curentpwd"].value
        let password= this.registerForm.controls["password"].value
        let confirm=this.registerForm.controls["confirm"].value
        if(password!=''&&password!=null&&this.user.password==this.userService.hashPassword(curentpwd)&&password==confirm){
          datapwd= this.userService.hashPassword(this.registerForm.controls["password"].value)

       }
         let data={
       email:this.registerForm.controls["email"].value,
        password:datapwd,
        name:this.registerForm.controls["nom"].value,
        prenom:this.registerForm.controls["prenom"].value,
         }
       this.userService
       this.userService.updateProfile(id,data).subscribe((res)=>{
         console.log('id',res);

       this.user=res;

       })
      }

    }
  }


  function blobToFile(theBlob: Blob, fileName: string) {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }
