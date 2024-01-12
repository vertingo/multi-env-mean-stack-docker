import { User } from './../../../../models/userResponse';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  
  constructor( @Inject(MAT_DIALOG_DATA) public data: User, public dialogRef: MatDialogRef<UsersEditComponent>) { }

  
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }



  ngOnInit(): void {
  }

}
