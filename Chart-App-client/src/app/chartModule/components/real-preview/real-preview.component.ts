import { Component, OnInit, Input, OnChanges, SimpleChange, DoCheck } from '@angular/core';
declare var d3: any;

@Component({
  selector: 'real-preview',
  templateUrl: './real-preview.component.html',
  inputs: ['myValues'],

  styleUrls: ['./real-preview.component.css']
})
export class RealpreviewComponent implements OnInit, DoCheck {
  // @Input() myValues: any;
  myValues: any;
  chartID: any;
  isInitialized: boolean;

  constructor() {
    this.chartID = 'chart' + Date.now();
    this.isInitialized = false;

  }

  ngOnInit() {
    this.isInitialized = true;
    setTimeout(() => this.drawChart(), 500);
  }

  drawChart() {
    // console.log('BEFORE', this.myValues);
    if (this.myValues.maxY) {

      var maxY = this.myValues.maxY;
    }
     else{

     var maxY:any =100;
     }

      var height = 90;
    var width = 90;
    var y = 100 - this.myValues.yData

    d3.select('#' + this.chartID)
      .text("")
      .style('color', '#f4f4f4s')

      .append('svg')
      .attr('width', 67)
      .attr('height', 67)
      .style('background-color', '#fff')
      .style('border', '1px solid #c7bbbb')
      .append('rect')
      .style('fill', this.myValues.bColor)
      .attr('width', this.myValues.width)
      .attr('height', this.myValues.maxY)
      .attr('x', 0)
      .attr('y', () => {
        return (height / maxY) * y
      })

    // console.log('myValues', this.myValues);
  }

  ngDoCheck() {


    // this.myValues = changes['myValues'].currentValue;

    if (this.isInitialized)
      this.drawChart();
  }
}
