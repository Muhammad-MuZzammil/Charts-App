import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chartService';

@Component({
  selector: 'my-charts',
  templateUrl: './my-charts.component.html',
  styleUrls: ['./my-charts.component.scss']
})
export class MyChartsComponent implements OnInit {
  getDbChartValues;
  headValue
  constructor(private chartService: ChartService) {
this.myCharts();    
  }

  ngOnInit() {

  }
myCharts(){
this.chartService.getAllValuesOfChart()
      .then(chartValues => {
        this.getDbChartValues = chartValues;
        console.log('getDbChartValues', this.getDbChartValues);
      })
}

}
