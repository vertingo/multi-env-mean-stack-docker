import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service'
const googleLogoURL = "../assets/img/social/google+.svg";
const facebookLogoURL = "../assets/img/social/facebook.svg";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( public router: Router, public snackBar: MatSnackBar, private authService : AuthService, private formBuilder: FormBuilder, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer)
      { this.matIconRegistry.addSvgIcon("googleLogo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL)),
    this.matIconRegistry.addSvgIcon("facebookLogo", this.domSanitizer.bypassSecurityTrustResourceUrl(facebookLogoURL))}

    formGroup: FormGroup;
    submitted = false;
    loading = false;
    hide = true;

  ngOnInit(): void {

    this.createForm(); 
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      password: [null, [Validators.required, this.checkPassword]],
    });
  }


  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }


  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Adresse email requise' :
      this.formGroup.get('email').hasError('pattern') ? 'Adresse email non valide' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Mot de passe requis' :
      this.formGroup.get('password').hasError('requirements') ? 
      'Le mot de passe doit comporter au moins 8 caractères, une lettre majuscule' : '';
  }

  get f() { return this.formGroup.controls; }


   //login
   signIn()
   {

    this.submitted = true;
    if(this.formGroup.invalid) 
    {
      return;
    }

   this.loading = true;
   this.authService.signIn(this.formGroup.value).subscribe(
    data => {
        // this.router.navigate([this.returnUrl]);
        console.log(data)
        this.loading = false;
        this.router.navigate(['auth']);
    },
    err => {
        this.loading = false;
        console.log(err.error.message)
        this.authService.openSnackBar(err.error.message)
    });
    // this.router.navigate(['/']);
  }
}
