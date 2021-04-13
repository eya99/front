import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';
import { RouterModule, Routes } from '@angular/router';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { MailConfirmComponent } from './mail-confirm/mail-confirm.component';
import { Forgetpassword2Component } from './forgetpassword2/forgetpassword2.component';
import { ToastrModule } from 'ngx-toastr';

import {CodeVerificationComponent} from './code-verification/code-verification.component';


const routes: Routes = [

];



@NgModule({
  declarations: [FooterComponent, HeaderComponent, HomepageComponent, InscriptionComponent, ForgetpasswordComponent, MailConfirmComponent, Forgetpassword2Component,CodeVerificationComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,

    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()

  ]
})
export class BasicsModule { }
