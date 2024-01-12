import { UsersService } from './../../../services/users.service';
import { Ticket } from './../../../models/ticket';
import { User } from './../../../models/userResponse';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gain',
  templateUrl: './gain.component.html',
  styleUrls: ['./gain.component.scss']
})
export class GainComponent implements OnInit {

  constructor(private authService : AuthService, private userService : UsersService)
   { }

  lots : Ticket[];
  user : User;

  ngOnInit(): void {
     this.getInfoUser()
  }

  getInfoUser(){
     this.authService.getUserInfo().subscribe( (user) =>{ this.user = user, this.lots = user.gains})
  }


  receiveCode($event : Ticket){
    let id = this.authService.userValue._id
    console.log('coe',$event)
    console.log('id',id)
    this.userService.verifyLotUser(id, $event).subscribe( res => console.log(res))
  }





}
