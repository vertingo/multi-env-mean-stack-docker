import { User } from './../../../../models/userResponse';
import { UsersService } from './../../../../services/users.service';
import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-users-bloque',
  templateUrl: './users-bloque.component.html',
  styleUrls: ['./users-bloque.component.scss']
})
export class UsersBloqueComponent  {

 
  constructor( @Inject(MAT_DIALOG_DATA) public data: User, public dialogRef: MatDialogRef<UsersBloqueComponent>) { }

  
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }



}
