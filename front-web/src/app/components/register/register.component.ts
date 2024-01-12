import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service'
import { MustMatch } from '../shared/validator/confirm-password.validator';
const googleLogoURL = "../assets/img/social/google+.svg";
const facebookLogoURL = "../assets/img/social/facebook.svg";




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router, private authService : AuthService, private formBuilder: FormBuilder, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) 
   { this.matIconRegistry.addSvgIcon("googleLogo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL)),
  this.matIconRegistry.addSvgIcon("facebookLogo", this.domSanitizer.bypassSecurityTrustResourceUrl(facebookLogoURL))
   const currentYear = new Date().getFullYear();
  this.maxDate = new Date(currentYear - 10, 11, 31);}

  maxDate: Date;

  formGroup: FormGroup;
  submitted = false;
  loading = false;
  hide =true;



  
  ngOnInit(): void {

    this.createForm(); 
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let caracereregex : RegExp = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    let adressregex : RegExp = /^[A-z0-9À-ž\s ,.'-]+$/;
    let phonenumberregex : RegExp = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    let dateregex : RegExp = /^((31(?!\ (Feb(ruary)?|Apr(il)?|June?|(Sep(?=\b|t)t?|Nov)(ember)?)))|((30|29)(?!\ Feb(ruary)?))|(29(?=\ Feb(ruary)?\ (((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))|(0?[1-9])|1\d|2[0-8])\ (Jan(uary)?|Feb(ruary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sep(?=\b|t)t?|Nov|Dec)(ember)?)\ ((1[6-9]|[2-9]\d)\d{2})$/;

    this.formGroup = this.formBuilder.group({
      lastname: [null,  [Validators.required, Validators.pattern(caracereregex)]],
      firstname: [null, [Validators.required, Validators.pattern(caracereregex)]],
      phonenumber: [null,[Validators.required, Validators.pattern(phonenumberregex)]],
      birthday: [null,[Validators.required]],
      adress: [null,[Validators.required, Validators.pattern(adressregex)]],
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      password: [null, [Validators.required, this.checkPassword]],
      confirmPassword:[null, Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
}


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame : true }
  }



  getErrorLastname() {
    return this.formGroup.get('lastname').hasError('required') ? 'Nom requis' : 
    this.formGroup.get('lastname').hasError('pattern') ? 'Nom non valide' : 'Nom non valide';
  }

  getErrorFirstname() {
    return this.formGroup.get('firstname').hasError('required') ? 'Prénom requis' : 
    this.formGroup.get('firstname').hasError('pattern') ? 'Prénom non valide' : 'Prénom non valide';
  }

  getErrorPhonenumber() {
    return this.formGroup.get('phonenumber').hasError('required') ? 'Numéro de téléphone requis' :
    this.formGroup.get('phonenumber').hasError('pattern') ? 'Numéro de téléphone non valide' : '';
  }

  getErrorAdress() {
    return this.formGroup.get('adress').hasError('required') ? 'adresse requise' : 
    this.formGroup.get('adress').hasError('pattern') ? 'Prénom non valide' : 'Prénom non valide';
  }

  getErrorDate() {
    return this.formGroup.get('birthday').hasError('required') ? 'Date de naissance requise' : 
    this.formGroup.get('birthday').hasError('pattern') ? 'Date de naissance non valide' : '';
  }

  getErrorConfirmPassword() {
    return this.formGroup.get('confirmPassword').hasError('required') ? 'Confirmation mot de passe requise' :
      this.formGroup.hasError('MustMatch') ? 
      '' : 'Les mots de passe saisis ne sont pas identiques';
  }


  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[A-Z])(?=.*[a-z])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }



  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Adresse email requise' :
      this.formGroup.get('email').hasError('pattern') ? 'Adresse email non valide' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Mot de passe requis' :
      this.formGroup.get('password').hasError('requirements') ? 
      'Le mot de passe doit comporter au moins 8 caractères, une lettre majuscule,  une lettre majuscule' : '';
  }

  get f() { return this.formGroup.controls; }



  // openSnackBar(message : string) {
  //   this.snackBar.open(message, 'action', {
  //     duration: 5000,
  //   });
  // }
  


   signUp(){

    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.loading = true;
   this.authService.signUP(this.formGroup.value).subscribe(
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

   console.log(this.formGroup.value)
   
  }

}
