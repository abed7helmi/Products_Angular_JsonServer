import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  actions : Array<any> =[
    {title :"Home", "route":"/home", icon : "house"},
    {title :"Products", "route":"/products", icon : "search"},
    {title :"New Product", "route":"/newProduct", icon : "safe"}
  ];
  currentAction :any;
  //public isLoading : boolean = false

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  constructor( public appState : AppStateService, public ls : LoadingService) {
    // rq : si je met le service private , je peux pas l'utiliser dans la template


    /*this.ls.isLoading$.subscribe({
      next : (value) =>{
        this.isLoading=value;
      }
    })*/

  }

}
