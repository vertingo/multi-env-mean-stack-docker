import { MatTableDataSource } from '@angular/material/table';
import { EmailService } from './../../../../services/email.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) { }

  formGroup: FormGroup;
  selectedRadio: number;
  adressemail: string;

  ngOnInit(): void {
    this.createForm();
  }

  //radio button
  public userOptions: any = [
    { label: 'Tout les clients', value: '0', checked: true },
    { label: 'Clients gagnant', value: '1', checked: false },
    { label: 'Clients non gagnant', value: '2', checked: false },
    { label: 'Clients compte actives', value: '3', checked: false },
    { label: 'Clients bloqués', value: '4', checked: false },
    { label: 'Adresse email', value: '5', checked: false }
  ];

  //select radio button
  selectValue($event) {
    this.selectedRadio = $event.source.value
  }





  createForm() {
    let caracereregex: RegExp = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    this.formGroup = this.formBuilder.group({
      title: [null, [Validators.required, Validators.pattern(caracereregex)]],
      description: [null, [Validators.required, Validators.pattern(caracereregex)]],
      subject: [null, [Validators.required, Validators.pattern(caracereregex)]],
      text: [null, [Validators.required, Validators.pattern(caracereregex)]]
    });
  }



  getErrorTitle() {
    return this.formGroup.get('title').hasError('required') ? 'Titre requis' :
      this.formGroup.get('title').hasError('pattern') ? 'Titre non valide' : 'Titre non valide';
  }

  getErrorDescription() {
    return this.formGroup.get('description').hasError('required') ? 'Description requise' :
      this.formGroup.get('description').hasError('pattern') ? 'Description non valide' : 'Description non valide';
  }

  getErrorObject() {
    return this.formGroup.get('subject').hasError('required') ? 'Objet requis' :
      this.formGroup.get('subject').hasError('pattern') ? 'Objet non valide' : 'Objet non valide';
  }

  getErrorMessage() {
    return this.formGroup.get('text').hasError('required') ? 'Message requis' :
      this.formGroup.get('text').hasError('pattern') ? 'Message non valide' : 'Message non valide';
  }


  get f() { return this.formGroup.controls; }


  // rest form
  resetForm() {
    this.formGroup.reset()
  }


  // send email
  sendEmail() {

    if (this.formGroup.invalid) {
      return;
    }

    let email = ''
    let isgain: any = ''
    let isactive: any = ''

    if (this.selectedRadio == 5) { email = this.adressemail }
    if (this.selectedRadio == 1) { isgain = true }
    if (this.selectedRadio == 2) { isgain = false }
    if (this.selectedRadio == 3) { isactive = true }
    if (this.selectedRadio == 4) { isactive = false }

    this.emailService.sendEmail(this.formGroup.value, email, isgain, isactive).subscribe(res => res)

  }



}
