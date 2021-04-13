import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminComponent } from './dashboardAdmin/dashboardAdmin.component';
import { ProfileadminComponent } from './profileadmin/profileadmin.component';
import { ListUserComponent } from './ListUser/ListUser.component';


import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatDialogModule } from '@angular/material/dialog';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';

import {MatSliderModule} from '@angular/material/slider';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [DashboardAdminComponent,ProfileadminComponent,ListUserComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    ColorPickerModule,
    RouterModule,
    NgxDropzoneModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    DragDropModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,




    ReactiveFormsModule,
  ]
})
export class AdminModule { }
