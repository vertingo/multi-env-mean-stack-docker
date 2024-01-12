import { UsersService } from './../../../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from './../../../../models/userResponse';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profil-info-user',
  templateUrl: './edit-profil-info-user.component.html',
  styleUrls: ['./edit-profil-info-user.component.scss']
})
export class EditProfilInfoUserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public element: User,  public dialogRef: MatDialogRef<EditProfilInfoUserComponent>,
    private formBuilder: FormBuilder, private usersService: UsersService)
   {}
   formGroup: FormGroup;
   submitted = false;
   user = this.element

   ngOnInit(): void {

    this.createForm(); 
  }



  createForm() {
   
    let phonenumberregex : RegExp = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    this.formGroup = this.formBuilder.group({
      phonenumber: [Validators.pattern(phonenumberregex)],
      adress:[]
    });
  }


 // login
 updateProfil(){

  this.submitted = true;
  if (this.formGroup.invalid) {
    return;
  }
  this.usersService.editOneUser(this.element._id, this.formGroup.value).subscribe(
    data => {
        // this.router.navigate([this.returnUrl]);
        console.log(data)
        // this.loading = false;
        // this.router.navigate(['auth']);
    },
    err => {
        // this.loading = false;
        // console.log(err.error.message)
        // this.authService.openSnackBar(err.error.message)
    });
}

getErrorPhonenumber() {
  return this.formGroup.get('phonenumber').hasError('pattern') ? 'Numéro de téléphone non valide' : '';
}
  
 onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}