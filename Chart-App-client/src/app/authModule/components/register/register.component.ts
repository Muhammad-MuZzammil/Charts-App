import { Component, OnInit, DoCheck, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  outputs: ['registerClicked'],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerClicked = new EventEmitter();
  trueLoginAlert: boolean = false;
  email: boolean = false;

  uniqueEmail: boolean = false;
  emailError;

  // Register Form Object
  RegisterFormObj: any;
  // Confirm Password Mesages
  setPassword: string;
  // wrong confirm password warning
  warningShow: boolean = false;
  // correct confirm password message
  setPasswordShow: boolean = false;

  // Confirm Password Mesages
  passwordWarning: string;

  // Register Form
  // loginSection: boolean = false

  // registerSection: boolean = true;
  //   Forms Group Objects which can be initially empty fields in constructor.
  registerForm: FormGroup;
  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {
    this.registerForm = fb.group({
      'Username': [''],
      'email': [''],
      'password': [''],
      'confirmPassword': ['']
    })
  }
  ngOnInit() {

  }


  /*====== Start Signup=======*/
  // Check password and confirm password 
  checkValidation(fieldValue) {
    this.uniqueEmail = false

    this.RegisterFormObj = {
      // 'Username': fieldValue.Username,
      // 'email': fieldValue.email,
      'password': fieldValue.password,
      'confirmPassword': fieldValue.confirmPassword,
    }
    // when password and confirm password matched press tab button and showing the message Password Set
    if (this.RegisterFormObj.password === this.RegisterFormObj.confirmPassword) {
      this.setPassword = "Password and Confirm Password matched..."
      console.log(" this.message", this.setPassword)
      this.warningShow = false;
      this.setPasswordShow = true;




    }
    // when password and confirm password don't  matched press tab button and showing the message 
    // Password and confirm Password must be similar

    else if (this.RegisterFormObj.password !== this.RegisterFormObj.confirmPassword) {
      this.passwordWarning = "Password and confirm Password must be similar"
      console.log(" this.message", this.passwordWarning)
      this.warningShow = true;
      this.setPasswordShow = false

    }

  }
  // Post Register Form Data
  SubmitRegisterForm(registerForm, event) {
    this.email = true;
    let registerFormValue = {
      'Username': registerForm.Username,
      'email': registerForm.email,
      'password': registerForm.password,
      'confirmPassword': registerForm.confirmPassword,
    }
    if (registerFormValue.Username && registerForm.email && registerForm.password && registerForm.confirmPassword) {


      this.authService.postRegisterFormData(registerFormValue)
        .then(res => {
          console.log('res', res.json().token)
          this.trueLoginAlert = true;
          localStorage.setItem("Token", res.json().token);
          this.registerClicked.emit(event.Username)

        })
        .catch(err => {
          console.log('err', JSON.parse(err._body).text)
          this.emailError = JSON.parse(err._body).text
          this.uniqueEmail = true;
        })
    }
   
  }
  // Move from Register to Login Form

  moveToLogin() {
    this.router.navigate(['/login'])
  }
  /*====== End Signup=======*/
  onFocusEmial() {
    this.uniqueEmail = false

  }
}
