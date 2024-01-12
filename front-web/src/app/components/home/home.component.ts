import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
const imgRange = "assets/img/concours/range.png";
const imgReduction = "assets/img/concours/70.png";
const imgBurger = "assets/img/concours/burger2.png";
const imgDessert = "assets/img/concours/dessert5.png";
const imgMenuJour = "assets/img/concours/menu-jour.png";
const imgMenuChoix = "assets/img/concours/menu-choix.png";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private domSanitizer: DomSanitizer, ) { }

  ngOnInit(): void {
  }
  
  getImgRange(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(imgRange)
  }

  getDessert(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(imgDessert)
  }

  getBurger(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(imgBurger)
  }

  getMenuJour(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(imgMenuJour)
  }

  getMenuChoix(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(imgMenuChoix)
  }

  getReduction(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(imgReduction)
  }

}
