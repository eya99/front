import { User } from './../../entities/user';
import { ProjectService } from './../../_services/project.service';

import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ValidatorFn,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MatSelectModule } from '@angular/material/select';
import { Project } from 'src/app/entities/project';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
//import { CategoryService } from 'src/app/_services/category.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit {
  
  private loggeduser: User;
  selected = '';
  values = '';
  bb = '';
  onKey(event: any) {
    // without type info
    this.values = event.target.value;
  }
  selectChangeHandler(event: any) {
    //update the ui
    this.selected = event.target.value;
  }
  registerForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private projectService: ProjectService,
    private tokenStorage: TokenStorageService
  ) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(Popup, {
      width: '250px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  btnClick = async function  () {
    console.log('this is the selected category : ' + this.selected);
    console.log("this is the name of u're application : " + this.values);
    const project: Project = new Project();
    project.category = this.selected;
    project.name = this.values;
    project.userId = this.bb;
    const timeout = 5000;
    localStorage.setItem('projectname',project.name);
    const dialogRef = this.dialog.open(Popup, {
      width: '300px',
      
    });
    
    
    

    this.projectService.createProject(project).subscribe((data) => {});
    
      dialogRef.afterOpened().subscribe(_ => {
        setTimeout(() => {
           dialogRef.close();
           
        }, timeout)
      })
      
      this.router.navigate(['/dashboard']);
   //5s
  
 
  }
  

  

  ngOnInit(): void {
    this.loggeduser = this.tokenStorage.getUser();
    this.bb = this.loggeduser[Object.keys(this.loggeduser)[0]];
    console.log('this is the user id ' + this.bb);
  }
}
@Component({
  selector: 'popup',
  templateUrl: 'popup.html',
})
export class Popup {

  constructor(
    public dialogRef: MatDialogRef<Popup>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}