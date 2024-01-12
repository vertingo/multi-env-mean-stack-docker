import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit {

  form: FormGroup;
  startDate : Date;
  endDate   : Date;
  @Output() filterUsers = new EventEmitter<any>();

  constructor( private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      lastname  :[''],
      firstname :[''],
      email     :['', Validators.email],
      adress    :[''],
      date      :[{begin: this.startDate, end: this.endDate}]
    });
    
   }

  toppings = new FormControl();
  toppingList: string[] = ['Gagnant', 'Bloqué', 'servé'];
  topping

  ngOnInit(): void {
  }


  filterUser(){
    this.filterUsers.emit(this.form.value);
  }
  reset(){
   this.form.reset()
  }

}
