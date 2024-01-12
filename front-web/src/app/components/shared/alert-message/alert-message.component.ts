import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent {

  constructor(
    public snackBarRef: MatSnackBarRef<AlertMessageComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  

}
