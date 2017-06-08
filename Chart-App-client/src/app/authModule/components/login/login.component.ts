import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  outputs: ['loginClicked'],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginClicked = new EventEmitter();

  registerSection
  // Register Form
  // registerSection: boolean = false;
  // loginSection: boolean = true
  // Key in  Local Storage Get Login Item
  getToken;
  // Login Form Object
  LoginFormObj;
  // Show/Hide Alerts after checking Email password and confirm password from database 
  trueLoginAlert: boolean = false;
  falseLoginAlert: boolean = false;
  //   Forms Group Objects which can be initially empty fields in constructor.
  loginForm: FormGroup;
  constructor(public authService: AuthService, public router: Router, public fb: FormBuilder) {

    this.loginForm = fb.group({
      'userEmail': [''],
      'userPassword': [''],
    })
  }

  ngOnInit() {
    this.getToken = localStorage.getItem("Token");
    if (this.getToken) {
      //   //  See Line 38
      // this.router.navigate(['/createChart']);
    }
  }

  /*====== Start Login=======*/

  SubmitLoginForm(loginForm,event) {
    // User fill login form fields
    this.LoginFormObj = {
      'userEmail': loginForm.userEmail,
      'userPassword': loginForm.userPassword,
    }
    // Server Post Request which can be check  authorized or fake User
    this.authService.postLoginFormData(this.LoginFormObj)
      .then(res => {

        console.log('res', res.json().token);
        console.log('res', res.json().username);
        this.trueLoginAlert = true;
        // Key in  Local Storage true Login Item

        localStorage.setItem("Token", res.json().token);
          this.loginClicked.emit(res.json().username)
          
        
        // When user login showing dashboard and navigate to home page after 2 second
        if (this.getToken) {
          this.router.navigate(['/createChart'])

        }
      }, err => {
        if (err.status === 400) {
          this.falseLoginAlert = true;
        } else {
          //show generic error

        }
      });
  }
  // Move from Login to Register Form
  moveToCreateAccount() {
    this.router.navigate(['/register'])
  }
  /*====== Start Login=======*/

  
}
