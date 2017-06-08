import { Component, OnInit,EventEmitter } from '@angular/core';
import {  Routes, Router } from '@angular/router';


import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';



@Component({
  selector: 'rootAuthComponent',
  templateUrl: './root-auth-component.component.html',
  outputs:['onAuth'],
  styleUrls: ['./root-auth-component.component.scss']
})

export class RootAuthComponentComponent implements OnInit {
  onAuth = new EventEmitter();
  // onRegister = new EventEmitter();

  register: boolean = false;
  login: boolean = true;
  getRouter
  constructor(public router: Router) {
    this.router.events
      .subscribe((event) => {
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        this.getRouter = event.url;
        console.log('event', event.url);
        if (event.url === '/login') {
          this.login = true
          this.register = false
        }
        else if (event.url === '/register'){
          this.register = true;
          this.login = false
          
        }
      })
  }

  ngOnInit() {



  }
   catchAuth(event){
    console.log("saad",event);
this.onAuth.emit(event)
  }
 

}
