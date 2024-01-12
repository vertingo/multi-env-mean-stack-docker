import { ResponseContactComponent } from './response-contact/response-contact.component';
import { ConfirmMessageComponent } from './../../shared/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from './../../../models/contact';
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss']
})
export class AssistanceComponent implements OnInit {

  constructor(private contactService: ContactService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscribeToGetOpenMessage()
  }

  listOpenMessage : Contact[];

  //sbscribe statistic
  subscribeToGetOpenMessage() {
    this.contactService.getOpenMessage().subscribe((res) => {
       this.listOpenMessage = res
    })
  }

  subscribeToGetCloseMessage() {
    this.contactService.getColseMessage().subscribe((res) => {
       this.listOpenMessage = res
    })
  }


  responseMessage($event){
     console.log($event)
     this.openResponseContact($event)
  }

  closeMessage($event){
     console.log('qsdqsd',$event)
    this.openDialog($event)
  }


  openResponseContact(event) {
    const dialogRef =
     this.dialog.open(ResponseContactComponent, {
      width: '48%',
      data: event
      });

    dialogRef.afterClosed().subscribe(() => {
      // this.contactService.closeContact()
    });
  }






  openDialog(event) {
    const dialogRef =
     this.dialog.open(ConfirmMessageComponent, {
      width: '38%',
      data: {
        response: event
      }});

    dialogRef.afterClosed().subscribe(() => {
      // this.contactService.closeContact()
    });
  }

}
