import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators,FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
  encapsulation: ViewEncapsulation.None

})

export class InscriptionComponent implements OnInit {
  registerForm: FormGroup;
  isemail=false;

  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,

    private authService:AuthService,
    private router: Router
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

    this.registerForm = this.fb.group(formControls)
   }
  ngOnInit(): void {

  this.registerForm = this.fb.group({
   name           : ['', Validators.required],
   prenom           : ['', Validators.required],

    email          : ['', [Validators.required, Validators.email]],
    password       : ['', Validators.required],
    passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
});

// Update the validity of the 'passwordConfirm' field
// when the 'password' field changes


}

onSubmit() {
  if (this.registerForm.valid){
    this.authService.register(this.registerForm.value).subscribe( res => {
      console.log(res)
      const id = res._id;
      if(res.user.isemail){
        this.isemail=true;

      }
       else{
      this.toastr.success(res.message);
        this.router.navigate(['code-verification/'+res.user._id]);
      }
     });

  }
}

}
/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
 export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if ( !control.parent || !control )
  {
      return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if ( !password || !passwordConfirm )
  {
      return null;
  }

  if ( passwordConfirm.value === '' )
  {
      return null;
  }

  if ( password.value === passwordConfirm.value )
  {
      return null;
  }

  return {passwordsNotMatching: true};
};
