import { User } from './../../../../models/userResponse';
import { UsersService } from './../../../../services/users.service';
import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.scss']
})
export class UsersDeleteComponent  {

  constructor( @Inject(MAT_DIALOG_DATA) public data: User, public dialogRef: MatDialogRef<UsersDeleteComponent>) { }

  
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }



}
