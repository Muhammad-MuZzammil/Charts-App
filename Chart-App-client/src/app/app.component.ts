import { Component  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions } from '@angular/http'; // Http Module
import { AuthService } from './authModule/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName;

  headValue
  // Sidebar ENUMs
  SIDEBAR_NAV = {
    CREATE_CHART: "CREATE_CHART",
    MY_CHART: "MY_CHART",
    MY_PROFILE: "MY_PROFILE",
    TUTORIALS: "TUTORIALS",
    GALLERY: "GALLERY",
    SETTINGS: "SETTINGS"
  }

  // selected selectedSideBarNav
  selectedSideBarNav = this.SIDEBAR_NAV.CREATE_CHART;

  //Boolean variables to show and hide UI elements


  // Login Form
  authRoutes: boolean = true;

  // Show/Hide Alerts after checking Email password and confirm password from database 

  // Show/Hide dasnboard after Login authorized User
  dashboard: boolean = false;
  // chartRoutes: boolean = false;



  // Key in  Local Storage Get Login Item


  // See Line 47
  getToken;

  //   Forms Group Objects which can be initially empty fields in constructor.
  loginForm: FormGroup;
  registerForm: FormGroup;
  private getRouter;

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {
    

    // See Line 51
  }

  ngOnInit() {

    this.sideBarDiv();
   this.shownCompByToken();

  }

  // sideBarDiv

  sideBarDiv() {
    $("#wrapper").toggleClass("toggled");
    $("#logout").toggleClass("toggle-logOut")
    $("#sideBarDiv").toggleClass("toggle-sideBarDiv")
    $("#headerNav").toggleClass("toggle-navbar")
  }



  /*====== start Dashboard=======*/
  // Select Sidebar Nav to prominent the Nav with color
  selectedSideBar(sidebarNav) {
    this.selectedSideBarNav = sidebarNav;
  }



  // Move from dashboard to Login Form
  logout() {

    // Key in  Local Storage false Login Item
    // localStorage.setItem("isLogin", "false");
    localStorage.removeItem("Token");
    // after submitting the value in Form. To clear the fields.
    this.loginForm = this.fb.group({
      'userEmail': [''],
      'userPassword': [''],
    })
    this.dashboard = false;
    this.authRoutes = true;
    this.router.navigate(['/login'])

  }
  /*====== End Dashboard=======*/
  catchRootAuth(event) {
    console.log("Muzz", event);
    this.userName = event;
   this.shownCompByToken();

}

shownCompByToken(){
   
this.getToken = localStorage.getItem("Token");
 if (!this.getToken) {
      //  See Line 38
      this.dashboard = false;
      this.authRoutes = true;

    } 
    else if (this.getToken) {

      this.dashboard = true;
      this.authRoutes = false;
      this.router.navigate(['/createChart'])

    }
}

}


