import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-forgetpassword2',
  templateUrl: './forgetpassword2.component.html',
  styleUrls: ['./forgetpassword2.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class Forgetpassword2Component implements OnInit,OnDestroy {


  resetPasswordForm: FormGroup;
  errorMessage = '';
  verifCode: any;
  settings: any;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(

      private _formBuilder: FormBuilder,
      private authService: AuthService,

      private rout: Router,
       private activatedRoute: ActivatedRoute)
      {
        this.activatedRoute.params.subscribe(params => {
          this.verifCode = params['code'];
          });

          this.resetPasswordForm = this._formBuilder.group({

              idUser          : [''],
              password       : ['', Validators.required],
              confirmPassword: ['', [Validators.required, confirmPasswordValidator]]
          });
      // Configure the layout


      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {


      this.activatedRoute.params.subscribe(params => {
          this.verifCode = params['code'];

          this.authService.verifCode(this.verifCode).subscribe((response: any) => {
            if (response.message && response.message === 'invalid code') {
              this.rout.navigateByUrl('/auth/login');
            } else {
              this.settings = response;
          this.resetPasswordForm = this._formBuilder.group({
              idUser          : [this.settings.idUser],
              password       : ['', Validators.required],
              confirmPassword: ['', [Validators.required, confirmPasswordValidator]]
          });
            }
          });
        });





      this.resetPasswordForm.get('password').valueChanges
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
              this.resetPasswordForm.get('confirmPassword').updateValueAndValidity();
          });
  }
  onSubmit() {
      this.authService.updatePassword(this.resetPasswordForm.value).subscribe(
        data => {

          this.rout.navigate(['']);
        });
    }


  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
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
  const confirmPassword = control.parent.get('confirmPassword');

  if ( !password || !confirmPassword )
  {
      return null;
  }

  if ( confirmPassword.value === '' )
  {
      return null;
  }

  if ( password.value === confirmPassword.value )
  {
      return null;
  }

  return {passwordsNotMatching: true};
};

