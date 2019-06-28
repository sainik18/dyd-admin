import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {

  constructor(private router : Router){

  }
  toggleClass = "ft-maximize";
  public isCollapsed = true;
  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else this.toggleClass = "ft-maximize";
  }

  ChangeLanguage(lang){
    localStorage.setItem('lang',lang);
    let re = /devotion/gi;
    if(this.router.url.search(re) == 1){
      location.reload()
    }
  }
}
