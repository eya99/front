import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.scss']
})
export class CodeVerificationComponent implements OnInit {
  codeForm: FormGroup
  _id:any
    constructor(
      private userService: AuthService,
         private fb: FormBuilder,
      private router: Router,
      private toastr: ToastrService,
      private actiVrouter: ActivatedRoute,



      ) {
  let formControls={
    code:new FormControl('',[
  Validators.required,
  Validators.minLength(3)

    ])
  }
  this.codeForm=this.fb.group(formControls)


      }
    ngOnInit(): void {
    this._id = this.actiVrouter.snapshot.paramMap.get('id');
    }
    resend(){

    this.userService.resendEmail(this._id).subscribe((res)=>{

    })
        }
    sendcode(){
  let data=this.codeForm.value;
  if(this.codeForm.valid){
  this.userService.verificationAcccount(this._id,data).subscribe((res)=>{
  console.log(res);
  if(res.verified==true){
  this.router.navigate(['/']);

  }

  })
  }

    }

  }
