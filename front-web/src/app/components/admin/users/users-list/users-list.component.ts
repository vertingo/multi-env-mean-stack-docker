import { UsersService } from './../../../../services/users.service';
import { UsersEditComponent } from './../users-edit/users-edit.component';
import { UsersBloqueComponent } from './../users-bloque/users-bloque.component';
import { UsersDetailsComponent } from './../users-details/users-details.component';
import { element } from 'protractor';
import { MatDialog } from '@angular/material/dialog';
import { User } from './../../../../models/userResponse';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  @Input() users: User[];
  @Input() page: number;
  @Input() pageSize: number;
  @Input() total: number;
  @Output() filter = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private usersService: UsersService) { }



  displayedColumns: string[] = ['lastname', 'firstname', 'email', 'details', 'update', 'bloque', 'delete'];
  dataSource = new MatTableDataSource<any>(this.users);




  handlePage($event) {
    this.filter.emit($event);
  }

  // detail user 
  detailUser(element): void {
    const dialogRef = this.dialog.open(UsersDetailsComponent, {
      width: '650px',
      height: '440px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.bookService.cancelBook(this._book.id).subscribe(
      //     response => {
      //       this.openDialog()
      //     }
      //   )
      // }
    });
  }

  // edit user 
  editUser(element): void {
    const dialogRef = this.dialog.open(UsersEditComponent, {
      width: '350px',
      height: '140px',
      data: "Souhaitez-vous supprimer cet utilisateur ?"
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.bookService.cancelBook(this._book.id).subscribe(
      //     response => {
      //       this.openDialog()
      //     }
      //   )
      // }
    });
  }


  // bloque user 
  bloqueUser(element :User): void {
    const dialogRef = this.dialog.open(UsersBloqueComponent, {
      width: '350px',
      height: '140px',
      data: "Souhaitez-vous bloquer cet utilisateur ?"
    });
     let bloqued = {isActive : false }

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.editOneUser(element._id, bloqued).subscribe(
          response => {
            // this.openDialog()
            console.log(response)
          }
        )
      }
    });
  }


  // delete user 
  deleteUser(element :User): void {
    const dialogRef = this.dialog.open(UsersDeleteComponent, {
      width: '350px',
      height: '140px',
      data: "Souhaitez-vous supprimer cet utilisateur ?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.deleteOneUser(element._id).subscribe(
          response => {
            // this.openDialog()
            console.log(response)
          }
        )
      }
    });
  }







}
