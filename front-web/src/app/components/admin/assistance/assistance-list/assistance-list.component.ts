import { Contact } from './../../../../models/contact';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-assistance-list',
  templateUrl: './assistance-list.component.html',
  styleUrls: ['./assistance-list.component.scss']
})
export class AssistanceListComponent implements OnInit {

  @Input() listOpenMessage : Contact[]
  @Output() response = new EventEmitter<Contact>();
  @Output() close = new EventEmitter<Contact>();
  
  constructor() { }

  panelOpenState = false;


  responseMessage(event){
    this.response.emit(event);
  }


  closeMessage(event){
    this.close.emit(event);
  }


  ngOnInit(): void {
  }

}
