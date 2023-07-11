import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient , private appState : AppStateService) { }

   async login(username: string, password: string) {
     let user : any = await firstValueFrom(this.http.get("http://localhost:8089/users/" + username))
     // convert observable to promesse , await on l'a dait sur un promesse .
     if(password == atob(user.password)) { // btoa code base 64 / atob decode
       let decodedJwt: any = jwtDecode(user.token);
       this.appState.setAuthState({
         isAuthenticated: true,
         username: decodedJwt.sub,
         roles: decodedJwt.roles,
         token: user.token
       });
       return Promise.resolve(true);
     }else{
         return Promise.reject("bad mdp")
     }




   }
}
