import { TokenStorageService } from './../../_services/token-storage.service';
import { AddIconService } from './../../_services/add-icon.service';
import { Icon } from './../../entities/icon';
import { Component, ElementRef, OnInit, ViewChild , Inject } from '@angular/core';
import html2canvas from 'html2canvas';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-icon-dash',
  templateUrl: './icon-dash.component.html',
  styleUrls: ['./icon-dash.component.scss']
})
export class IconDashComponent implements OnInit {

  private loggeduser: User;
  username ='';
 icon_text = localStorage.getItem('projectname').slice(0,2).toUpperCase();
 capturedImage;
  iconDataUrl;
 @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
color = '#0000ff';
color1='#ffffff';
projectname = localStorage.getItem('projectname');
font_text_icon = 'Arial'
font_size_icon = '14px'
constructor(public dialog: MatDialog, private addIconService: AddIconService  , private tokenStorage: TokenStorageService) { }
openDialog(): void {
  const dialogRef = this.dialog.open(Popup, {
    width: '250px',
    
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}
selectChangeHandler(event: any) {
  //update the ui
  this.font_text_icon = event.target.value;
}
selectChangeHandler2(event: any) {
  //update the ui
  this.font_size_icon = event.target.value;
}
onKey(event: any) {
  // without type info
  this.color = event.target.value;
  console.log("this is the color choosed "+ console.log(event));
  
}
onKeytext(event: any) {
  // without type info
  this.icon_text = event.target.value;
}
onFileChanged(event) {
  const file = event.target.files[0]

}
downloadImage(){
  const icon: Icon = new Icon();
  html2canvas(document.querySelector("#idIcon")).then(canvas => {

    debugger;

    ///document.body.appendChild(canvas);
   this.capturedImage = canvas.toDataURL();
   console.log("canvas.toDataURL() -->" + this.capturedImage);
   // this will contain something like (note the ellipses for brevity), console.log cuts it off 
   // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAa0AAAB3CAYAAACwhB/KAAAXr0lEQVR4Xu2dCdiNZf7HP/ZQkpQtaUxDjYYoTSYlURMhGlmKa..."

   
   canvas.toBlob(function (blob) {
     
     //  just pass blob to something expecting a blob
     // somfunc(blob);

     // Same as canvas.toDataURL(), just longer way to do it.
     var reader = new FileReader();
     debugger;
     reader.readAsDataURL(blob);
     reader.onloadend = function () {
       let base64data = reader.result;
       console.log("Base64--> " + base64data);
      
     }

   });
   icon.projectname = localStorage.getItem('projectname') ;
   this.iconDataUrl = this.capturedImage;
 console.log('this is icon object : '+ this.iconDataUrl)
 this.addIconService.createIcon(this.projectname,this.iconDataUrl).subscribe((data) => {});
 });
 
 

    const dialogRef = this.dialog.open(Popup, {
      width: '300px',
      
    });
const timeout = 5000;
      dialogRef.afterOpened().subscribe(_ => {
        setTimeout(() => {
           dialogRef.close();
           
        }, timeout)
      })
}
  

  

  ngOnInit(): void {
    console.log("this is the project name"+ localStorage.getItem('projectname'));
    this.loggeduser=this.tokenStorage.getUser();
    this.username=this.loggeduser[Object.keys(this.loggeduser)[1]];
    console.log("this is user name " +this.username)
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