import { Ticket } from './../../../../models/ticket';
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gain-list',
  templateUrl: './gain-list.component.html',
  styleUrls: ['./gain-list.component.scss']
})
export class GainListComponent  {

  constructor() { }

  @Input() lots : Ticket[];


  displayedColumns: string[] = [ 'index', 'code', 'gain', 'isServed', 'date_used'];
  dataSource = new MatTableDataSource<any>(this.lots);



  subscribeToUsers() {
  
    // this.UsersService.getUsers(this.page,this.pageSize).subscribe((res) => {
    //   this.usersArray = res.users
    //   this.length = res.total
    //   this.page = res.page
    //   console.log(res.users)
    // })
  
  }
  
  
}
