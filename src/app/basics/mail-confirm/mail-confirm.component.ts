import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mail-confirm',
  templateUrl: './mail-confirm.component.html',
  styleUrls: ['./mail-confirm.component.scss']
})
export class MailConfirmComponent  {

  constructor( private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }
  email = this.route.snapshot.paramMap.get('email');

}
