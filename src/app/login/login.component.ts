import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Route, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  errorMessage = undefined;


  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService) {
  }

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    })
  }

  handleLogin() {
    console.log(this.formLogin.value)
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.authservice.login(username, password)
          .then(resp=>{
            this.router.navigateByUrl("/admin");
          })
          .catch(error=>{
            this.errorMessage=error;
          })

    // then QD JE RETOURNE UN PROMISE

  }
}