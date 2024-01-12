import { User } from './../../../../models/userResponse';
import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public element: User,  public dialogRef: MatDialogRef<UsersDeleteComponent>) {}

  
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }


}
