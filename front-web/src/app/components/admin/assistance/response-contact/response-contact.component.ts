import { Router } from '@angular/router';
import { Contact } from './../../../../models/contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-response-contact',
  templateUrl: './response-contact.component.html',
  styleUrls: ['./response-contact.component.scss']
})
export class ResponseContactComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public element: Contact,  public dialogRef: MatDialogRef<ResponseContactComponent>,
    private formBuilder: FormBuilder, private contactService: ContactService, public router : Router)
   {}
   formGroup: FormGroup;
   submitted = false;


   ngOnInit(): void {

    this.createForm(); 
  }



  createForm() {
   
    this.formGroup = this.formBuilder.group({
      text: [null, Validators.required],
    });
  }



 sendResponse(){

  this.submitted = true;
  if (this.formGroup.invalid) {
    return;
  }

  console.log(this.formGroup.value)
  this.contactService.responseContact(this.element._id, this.formGroup.value).subscribe(
    data => {
        // this.router.navigate([this.returnUrl]);
        console.log(data)
        this.router.navigate(['/assistance']);
        // this.loading = false;
        // this.router.navigate(['auth']);
    },
    err => {
        // this.loading = false;
        // console.log(err.error.message)
        // this.authService.openSnackBar(err.error.message)
    });
}




getErrorMessage() {
  return this.formGroup.get('text').hasError('required') ? 'Message requis' : '';
}




  
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
