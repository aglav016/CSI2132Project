import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCreds : any = {
    email: '',
    password: ''
  };
  signupCreds : any = {
    name: '',
    password: '',
    email: ''
  };
  hero : any = {
    name: ''
  };
  loginError : boolean = false;
  signupError : boolean = false;
  public emailRegex : string = '[A-Za-z0-9\-_]+@[A-Za-z0-9\_-]+\.[A-Za-z0-9\-_]+';
  constructor(private authService : AuthService, private parentRouter : Router) {
    let observable = this.authService.currentUser();
    if (observable){
      observable.subscribe(data => {
        if (data.role == 'chef'){
          this.parentRouter.navigateByUrl('/home-chef').catch(err => {
            console.error(err);
          });
        }
        else if (data.role == 'admin'){
          this.parentRouter.navigateByUrl('/home-admin').catch(err => {
            console.error(err);
          });
        }
        else{
          this.parentRouter.navigateByUrl('/home-user').catch(err => {
            console.error(err);
          });
        }
      }, err => {
        //Do nothing
      })
    }
  }

  ngOnInit() {
  }
  public resetSignupError(){
    this.signupError = false;
  }
  public resetLoginError(){
    this.loginError = false;
  }
  public submitLogin(){
    let successHandler = (data) => {
      console.log(data.role);
      if (data.role == 'chef'){
        this.parentRouter.navigateByUrl('/home-chef').catch(err => {
          console.error(err);
        });
      }
      else if (data.role == 'admin'){
        this.parentRouter.navigateByUrl('/home-admin').catch(err => {
          console.error(err);
        });
      }
      else{
        this.parentRouter.navigateByUrl('/home-user').catch(err => {
          console.error(err);
        });
      }
    };
    let errorHandler = (err) => {
      this.loginError = true;
    };
    this.authService.login(this.loginCreds.email, this.loginCreds.password).subscribe(successHandler, errorHandler);
  }
  public submitSignup(){
    let successHandler = (data) => {
      this.parentRouter.navigateByUrl('/home-user').catch(err => {
        console.error(err);
      });
    };
    let errorHandler = (err) => {
      console.log('error');
      this.signupError = true;
    };
    this.authService.signup(this.signupCreds.name, this.signupCreds.email, this.signupCreds.password).subscribe(successHandler, errorHandler);
  }

}
