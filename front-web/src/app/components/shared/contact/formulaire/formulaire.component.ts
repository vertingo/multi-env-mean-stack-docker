import { ConfirmComponent } from './confirm/confirm.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material/icon';
import { ContactService } from 'src/app/services/contact.service'
import { AuthService } from 'src/app/services/auth.service'
const googleLogoURL = "../assets/img/social/google+.svg";
const facebookLogoURL = "../assets/img/social/facebook.svg";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {

  constructor(private contactService: ContactService, private authService: AuthService, private formBuilder: FormBuilder,public dialog: MatDialog) { }

  formGroup: FormGroup;
  submitted = false;
  loading = false;
  response : string;




  ngOnInit(): void {

    this.createForm();
  }

  createForm() {
    let caracereregex : RegExp = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formGroup = this.formBuilder.group({
      lastname: [null,[Validators.required, Validators.pattern(caracereregex)]],
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      message: [null, Validators.required],
    });
  }


  getErrorLastname() {
    return this.formGroup.get('lastname').hasError('required') ? 'Nom requis' : 
    this.formGroup.get('lastname').hasError('pattern') ? 'Nom non valide' : '';
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Adresse email requise' :
      this.formGroup.get('email').hasError('pattern') ? 'Adresse email non valide' : '';
  }

  getErrorMessage() {
    return this.formGroup.get('message').hasError('required') ? 'Message requis' : '';
  }


  get f() { return this.formGroup.controls; }



  sendMsgContact() {

    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.loading = true;
    this.contactService.sendMsgContact(this.formGroup.value).subscribe(
      data => {
        console.log(data)
        this.response = data.message
        this.loading = false;
        this.openDialog()
      },
      err => {
        this.loading = false;
        console.log(err.error.message)
        this.authService.openSnackBar(err.error.message)
      });
  }


  openDialog() {
    const dialogRef =
     this.dialog.open(ConfirmComponent, {
      height: '40%',
      width: '38%',
      data: {
        response: this.response
      }});

    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

}
