import { EditProfilInfoConnexionComponent } from './edit-profil-info-connexion/edit-profil-info-connexion.component';
import { MatDialog } from '@angular/material/dialog';
import { EditProfilInfoUserComponent } from './edit-profil-info-user/edit-profil-info-user.component';
import { User } from './../../../models/userResponse';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

 
  constructor(private authService : AuthService, public dialog: MatDialog)
   { this.authService.user_info.subscribe((x) =>{this.user = x});}

   user : User;

  ngOnInit(): void {
  }




  //edit info user  
  editInfoUser(): void {
    const dialogRef = this.dialog.open( EditProfilInfoUserComponent, {
      width: '450px',
      height: '280px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.bookService.cancelBook(this._book.id).subscribe(
      //     response => {
      //       this.openDialog()
      //     }
      //   )
      // }
    });
  }



  editInfoUserConnexion(): void {
    const dialogRef = this.dialog.open( EditProfilInfoConnexionComponent, {
      width: '450px',
      height: '280px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.bookService.cancelBook(this._book.id).subscribe(
      //     response => {
      //       this.openDialog()
      //     }
      //   )
      // }
    });
  }
  


}
