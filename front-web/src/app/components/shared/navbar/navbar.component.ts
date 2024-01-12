import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService : AuthService)
   { this.authService.user_info.subscribe((x) =>{this.isLogged = x});}

   isLogged;

  ngOnInit(): void {
  }
  



  logOut(){
    this.authService.logout()
  }

}
