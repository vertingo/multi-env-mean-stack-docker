import { MatDialog } from '@angular/material/dialog';
import { ConfirmMessageComponent } from './../../shared/confirm-message/confirm-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MustMatch } from '../../shared/validator/confirm-password.validator';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor( public router: Router, public snackBar: MatSnackBar, private activatedRoute: ActivatedRoute, 
    private authService : AuthService, private formBuilder: FormBuilder,  public dialog: MatDialog)
      { }

    formGroup: FormGroup;
    submitted = false;
    loading = false;
    token ;

    private subscription : any;


  ngOnInit(): void {
    this.createForm(); 
    this.subscription = this.activatedRoute.params.subscribe( params => {
      this.token = params.token
     })
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createForm() {
   
    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required, this.checkPassword]],
      confirmPassword:['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
}





  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Mot de passe requis' :
      this.formGroup.get('password').hasError('requirements') ? 
      'Le mot de passe doit comporter au moins 8 caractères, une lettre majuscule' : '';
  }


  getErrorConfirmPassword() {
    return this.formGroup.get('confirmPassword').hasError('required') ? 'Confirmation mot de passe requise' :
      this.formGroup.hasError('MustMatch') ? 
      '' : 'Les mots de passe saisis ne sont pas identiques';
  }


  
  get f() { return this.formGroup.controls; }

 

 // login
   ResetPassword(){

    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.loading = true;
    let data = {'password': this.formGroup.value.password, 'resetLink': this.token  }

   this.authService.resetPassword(data).subscribe(
    data => {
        console.log(data)
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