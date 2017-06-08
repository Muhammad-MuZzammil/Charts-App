import { Component, OnInit, OnChanges, SimpleChange, Input,   } from '@angular/core';
import {  Router  } from '@angular/router';
import { ChartService } from '../../services/chartService';


@Component({
  selector: 'createChart',
  templateUrl: './createChart.component.html',
 
  styleUrls: ['./createChart.component.css'],
})
export class createChartComponent implements OnInit {

  public getDbChartValues : any; //declare variable to get charts data 

  public checkedLoggedIn : any  ; // declare this variable to check if user login or not

  constructor(private chartService: ChartService, private router: Router) {

      // this.checkedLoggedIn = localStorage.getItem('Token');


  }
 

  ngOnInit() {
    
    
          this.getCharts();
      
      
      // if(this.checkedLoggedIn){
      // }

  }

  getCharts(){
    
    this.chartService.getAllValuesOfChart()
      .then(chartValues => {
        this.getDbChartValues = chartValues;
        console.log('getDbChartValues', this.getDbChartValues);
      })
  }

  createSingleChart() {
    this.router.navigate(['/singleChart'])
  }
  createMultipleChart() {
    this.router.navigate(['/multiple-charts'])
  }
}
