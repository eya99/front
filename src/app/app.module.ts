import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { CategoryService } from './_services/category.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatSliderModule} from '@angular/material/slider';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { NgxDropzoneModule } from 'ngx-dropzone';


import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';



import {DragDropModule} from '@angular/cdk/drag-drop';








import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';


import { MatMomentDateModule } from '@angular/material-moment-adapter';


import { ToastrModule } from 'ngx-toastr';

import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    ColorPickerModule,
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,



    MatIconModule,
SocialLoginModule,

    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,

    RouterModule,
    MatMomentDateModule,
MatDatepickerModule,
NgxDropzoneModule,
MatSliderModule,
MatProgressSpinnerModule,
DragDropModule





  ],
  providers: [

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '42700467399-31mmt20gtceg1koa6ha65qsplshiena5.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('471159557632201')
          }
        ]
      } as SocialAuthServiceConfig,
    },

AuthService,
CategoryService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
