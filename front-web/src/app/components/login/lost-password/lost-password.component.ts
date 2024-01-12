import { MatDialog } from '@angular/material/dialog';
import { ConfirmMessageComponent } from './../../shared/confirm-message/confirm-message.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {

  constructor(public router: Router, public snackBar: MatSnackBar, public dialog: MatDialog,
    private authService: AuthService, private formBuilder: FormBuilder) { }

  formGroup: FormGroup;
  submitted = false;
  loading = false;



  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)]]
    });
  }


  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Adresse email requise' :
      this.formGroup.get('email').hasError('pattern') ? 'Adresse email non valide' : '';
  }


  get f() { return this.formGroup.controls; }


  // lost password
  lostPassword() {

    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.loading = true;
    this.authService.lostPassword(this.formGroup.value).subscribe(
      data => {
        this.loading = false;
        this.openDialog(data)
      },
      err => {
        this.loading = false;
        this.authService.openSnackBar(err.error.message)
      });
  }


  openDialog(data) {
    const dialogRef =
      this.dialog.open(ConfirmMessageComponent, {
        width: '38%',
        data: {
          response: data
        }
      });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }




}
