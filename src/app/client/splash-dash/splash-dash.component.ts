import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-dash',
  templateUrl: './splash-dash.component.html',
  styleUrls: ['./splash-dash.component.scss']
})
export class SplashDashComponent implements OnInit {
  color = '#0000ff';
 
   icon_color = localStorage.getItem('icon_color');
   text_color = localStorage.getItem('text_color');
   font_text_icon = localStorage.getItem('font_text_icon');
   font_size_icon = localStorage.getItem('font_size_icon');
   icon_text = localStorage.getItem('icon_text');
   round_icon = '10';
   
   icon_size;
  constructor() { }
  onKey(event: any) {
    // without type info
    this.color = event.target.value;
    console.log("this is the color choosed "+ console.log(event));
    
  }

  eventIconSize( event: any ) {

      this.icon_size=event.target.value+'px';
      this.font_size_icon=event.target.value - 40 +"px"
      console.log("this is the size"+this.font_size_icon )    
  }
  eventRoundSize( event: any ) {
    this.round_icon=''
    this.round_icon +=event.target.value+'px';
    
    console.log("this is the round"+this.round_icon )    
}
  
  ngOnInit(): void {
  }

}
