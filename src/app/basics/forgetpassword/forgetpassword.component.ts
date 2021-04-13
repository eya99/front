import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class ForgetpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  errorMessage = '';
  /**
   * Constructor
   *
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(

      private _formBuilder: FormBuilder,
      private authService: AuthService,
      private rout: Router
  )
  {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
   ngOnInit(): void
    {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }


  onSubmit() {
console.log(this.forgotPasswordForm.value.email)
      this.authService.resetPasswordMail(this.forgotPasswordForm.value).subscribe(
        data => {
          if (data.message === 'email sent') {

              this.rout.navigate(['mail-confirm/',this.forgotPasswordForm.value.email]);
          }
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    }
}
