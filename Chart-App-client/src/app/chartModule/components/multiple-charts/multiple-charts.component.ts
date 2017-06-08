import { Component, OnInit, OnChanges } from '@angular/core';
import {ColorPickerService} from 'angular2-color-picker';
import { Icon, IconsArray } from '../../classes/iconClass';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { ChartService } from '../../services/chartService';
import {  Router  } from '@angular/router';


// import 'd3'
declare var d3: any;
declare var $: any;
@Component({
  selector: 'multiple-charts',
  templateUrl: './multiple-charts.component.html',
  styleUrls: ['./multiple-charts.component.scss'],
})
export class MultipleChartsComponent implements OnInit {
  //Navigation states ENUMs
  NAVIGATION_STATES = {
    ADD_DATA: 'ADD_DATA',
    CONFIGURATION: 'CONFIGURATION',
    FINISH_EMBED: 'FINISH_EMBED'
  }

  //icon categories ENUMs
  ICON_CATEGORIES = {
    CATEGORY1: 'font-awesome-icons',
    CATEGORY2: '2',
    CATEGORY3: '3'
  }
  // Add_Data ENUMs
  ADD_DATA = {
    TYPE_DATA: "TYPE_DATA",
    UPLOAD_EXCEL: "UPLOAD_EXCEL",
    ADD_MACHINE: "ADD_MACHINE"
  }
  // Finish_Embed ENUMs
  FINISH_EMBED = {
    SAVE_AS: "SAVE_AS",
    Share: "Share",
    Embed: "Embed"
  }

  /*
    // //Boolean variables to show and hide UI elements
     showFinishButton: boolean = false;
     showNextButton: boolean = true;
     */

  //icon modal selected category
  selectedIconCategory = this.ICON_CATEGORIES.CATEGORY1;

  //selected navigation state
  selectedNavigationState

  //selected category of modal
  modalNavCategory;
  // selected ADD_DATA
  selectedAddDataChildNav = this.ADD_DATA.TYPE_DATA;
  // selected Finish_Embed
  selectedFinishEmbedChild = this.FINISH_EMBED.SAVE_AS;

  //this array will hold data for multiple charts
  public multipleChartsData = [];
  // Server Response
  public multipleChartsId;

  //array of icons defined in ../singleChart/iconClass'
  icons = IconsArray;

  //this variable will store the index of the chart for which the icon modal will open, 
  //we will use it to assign the icon to correct chart
  chartIconIndex;

  //selected icon in the modal
  selectedIconModal;


  constructor(
    private cpService: ColorPickerService,
    private chartService: ChartService,
    private router: Router
  ) {

  }

  ngOnInit() {


    // Chart data Object which can be initially empty fields in ngOnInit.
    this.multipleChartsData.push({
      xData: '',
      yData: 0,
      bColor: '',
      iconClass: '',
      title: '',
      height: 0,
      width: 0,
      maxY: 0,
    })
    this.selectedNavigationState = this.NAVIGATION_STATES.ADD_DATA;
    // If we don't  do this then shareChart wont recognize multipleChartsId.
    // this.multipleChartsId = this.multipleChartsData[0]


  }

  finish() {
    // This Request will create Multiple chart Data in Database
    this.createMultiChartsRequest();

  }
  shareChart() {
    console.log('this.multipleChartsId', this.multipleChartsId);
    if (!this.multipleChartsId) {
      this.createMultiChartsRequest();
    }
  }
 
  // blur function which can be detect changes
  chartValueChanged() {
    console.log(this.multipleChartsData);
  }

  chooseIcon() {
    console.log('saad');
  }
  // Icon selected from input field in icon Modal

  selectIcon(iconClass) {
    this.selectedIconModal = iconClass;
    this.multipleChartsData[this.chartIconIndex]['iconClass'] = iconClass;
  }
  // Select Icon categories
  selectCategory(categoryName) {
    this.selectedIconCategory = categoryName;
  }
  // This function selected Add Data navigation 
  selectNavigationState(state) {
    this.selectedNavigationState = state;
  }
  // This function selected Add Data child navigation 
  selectAddDatadNav(AddDataNav) {
    this.selectedAddDataChildNav = AddDataNav;
  }
  // This function selected Finish Embed child navigation 
  selectFinishEmbedChildNav(finishEmbed) {
    this.selectedFinishEmbedChild = finishEmbed;
  }

  previous() {
    if (this.selectedNavigationState == this.NAVIGATION_STATES.FINISH_EMBED) {

      this.selectedNavigationState = this.NAVIGATION_STATES.CONFIGURATION
    }
    else
      this.selectedNavigationState = this.NAVIGATION_STATES.ADD_DATA


  }
  next() {

    if (this.selectedNavigationState == this.NAVIGATION_STATES.ADD_DATA) {

      this.selectedNavigationState = this.NAVIGATION_STATES.CONFIGURATION
    }
    else
      this.selectedNavigationState = this.NAVIGATION_STATES.FINISH_EMBED

  }
  // Add New multiple chart fields
  addNewChart() {
    this.multipleChartsData.push({
      xData: '',
      yData: 0,
      bColor: '',
      iconClass: '',
      title: '',
      height: 0,
      width: 0,
      maxY: 0,

    })
  }
  // Show Icon modal
  openIconModal(modalInstance, chartIndex) {

    this.chartIconIndex = chartIndex;
    modalInstance.show();
  }
  // create this function to download chart in jpg format
  downlaodChart(imageType) {

    var doctype = '<?xml version="1.0" standalone="no"?>'
      + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

    // for (var i = 0; i < array.length; i++) {

    // }
    var source = (new XMLSerializer()).serializeToString(
      d3.select('svg')
        .node());
    // create a file blob of our SVG.
    var blob = new Blob([doctype + source], { type: 'image/svg+xml;charset=utf-8' });
    var url = window.URL.createObjectURL(blob);

    var img = d3.select('body').append('img')
      .attr('width', 100)
      .attr('height', 100)
      .style('display', 'none')
      .node();



    img.onload = function () {
      // Now that the image has loaded, put the image into a canvas element.
      var canvas = d3.select('body').append('canvas')
        .style('display', 'none')
        .node();
      canvas.width = 100;
      canvas.height = 100;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      var canvasUrl = canvas.toDataURL("image/" + imageType);
      var img2 = d3.select('body').append('a')
        .attr('width', 100)
        .attr('height', 100)
        .attr('download', 'chart.' + imageType)
        .node();
      // this is now the base64 encoded version of our PNG! you could optionally 
      // redirect the user to download the PNG by sending them to the url with 
      // `window.location.href= canvasUrl`.
      img2.href = canvasUrl;
      img2.click()
    }
    // start loading the image.
    img.src = url;



  }
  // Save multiple charts data in database
   createMultiChartsRequest() {
    this.chartService.createMultipleCharts(this.multipleChartsData)
      .then(res => {
        this.multipleChartsId = res.json()['_id'];
        console.log('this.multipleChartsId', this.multipleChartsId);
      })
  }


}

