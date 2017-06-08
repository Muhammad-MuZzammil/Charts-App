import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ng2-bootstrap/modal';
import {ColorPickerModule, ColorPickerService} from 'angular2-color-picker';
import { ChartService } from './chartModule/services/chartService';
import { AuthService } from './authModule/services/auth.service';
// import { authtRoutes } from './authModule/authRouter';



import { AppComponent } from './app.component';
import { singleChartComponent } from './chartModule/components/singleChart/singleChart.component';
import { createChartComponent } from './chartModule/components/createChart/createChart.component';
import { RealpreviewComponent } from './chartModule/components/real-preview/real-preview.component';
import { MultipleChartsComponent } from './chartModule/components/multiple-charts/multiple-charts.component';
import { MyChartsComponent } from './chartModule/components/my-charts/my-charts.component';
import { ShareComponent } from './chartModule/components/share/share.component';
import { LoginComponent } from './authModule/components/login/login.component';
import { RegisterComponent } from './authModule/components/register/register.component';
import { RootAuthComponentComponent } from './authModule/components/root-auth-component/root-auth-component.component';



export const chartRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'createChart', component: createChartComponent },
  { path: 'real-preview', component: RealpreviewComponent },
  { path: 'singleChart', component: singleChartComponent },
  { path: 'share/:id', component: ShareComponent },
  { path: 'multiple-charts', component: MultipleChartsComponent },
  { path: 'my-charts', component: MyChartsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
]



@NgModule({
  declarations: [
    AppComponent,
    singleChartComponent,
    createChartComponent,
    RealpreviewComponent,
    MultipleChartsComponent,
    MyChartsComponent,
    ShareComponent,
    LoginComponent,
    RegisterComponent,
    RootAuthComponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ColorPickerModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(chartRoutes)
  ],
  providers: [ColorPickerService, ChartService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
