import { User } from './../../../models/userResponse';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private UsersService: UsersService) { }

  users : User[];
  page : number = 1;
  pageSize : number = 10;
  total : number;
  startregister  = '';
  endregister = '';
  firstname: string = '';
  lastname : string = '';
  email: string = '';
  adress: string = '';


  ngOnInit() {
     this.subscribeToUsers();
  }



  filterUsersPage($event) {
    this.UsersService.getUsers($event.pageIndex+1,$event.pageSize,this.lastname,this.firstname,this.email,this.adress,this.startregister,this.endregister).subscribe((res) => {
     this.users = res.users
     this.total = res.total
    
    })
    console.log('1',$event)
  }

  filterUsersForm(userObject) {
    console.log('2',userObject)
    if(userObject.date == null){
     var start = null
     var end = null
    }
    if(userObject.date !== null){
      var start = userObject.date.begin
      var end = userObject.date.end
     }

     console.log('start : '+start)
     console.log('end : '+end)
    this.UsersService.getUsers(this.page, this.pageSize, userObject.lastname, userObject.firstname, userObject.email, userObject.adress, start, end).subscribe((res) => {
     this.users = res.users
     this.total = res.total
    })
    this.firstname = userObject.firstname
    this.lastname  = userObject.lastname
    this.email = userObject.email
    this.startregister = start
    this.endregister = end
    

    console.log('2',userObject)
  }
  
  
// sbscribe users
subscribeToUsers() {

  this.UsersService.getUsers(this.page, this.pageSize, this.lastname, this.firstname, this.email, this.adress, this.startregister, this.endregister).subscribe((res) => {
    this.users = res.users
    this.page = res.page
    this.total = res.total
  })
}

}


