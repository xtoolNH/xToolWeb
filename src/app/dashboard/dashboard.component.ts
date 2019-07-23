import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import * as myGlobals from '../model/global';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [trigger('fadeInOut', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      animate('1000ms', style({ transform: 'translateX(0)', opacity: 1 }))
    ]),
  ])
  ]
})
export class DashboardComponent implements OnInit {
  eegChart: any;
  faceChart: any;
  eegFullChart: any;
  faceFullChart: any;
  attentiondps = []; // dataPoints
  relaxeddps = [];
  stressdps = [];
  attention_yVal = 0;
  relaxed_yVal = 0;
  stress_yVal = 0;

  fullattentiondps = []; // dataPoints
  fullrelaxeddps = [];
  fullstressdps = [];
  fullattention_yVal = 0;
  fullrelaxed_yVal = 0;
  fullstress_yVal = 0;
  fullcounter = 0;
  fulldate_time_counter = 0;
  fullxVal = 0;
  fullEEgchart: any;
  facevideoInterval: any;
  fullvideoIntervalEEG: any;
  fullFacevideoInterval: any;

  angryExpdps = []; // dataPoints
  disgustedExpdps = [];
  fearfulExpdps = [];
  happyExpdps = [];
  sadExpdps = [];
  surprisedExpdps = [];
  neutralExpdps = [];

  fullfaceangryExpdps = []; // dataPoints
  fullfacedisgustedExpdps = [];
  fullfacefearfulExpdps = [];
  fullfacehappyExpdps = [];
  fullfacesadExpdps = [];
  fullfacesurprisedExpdps = [];
  fullfaceneutralExpdps = [];
  fullfacedate_time_counter = 0;
  fullfaceCounter = 0;
  fullfacechart: any;
  fullfaceChartxVal;
  flag = false;
  interval;
  counter = 0;
  faceCounter = 0;
  Angry: String = '0.0';
  Disgusted: String = '0.0';
  Fearful: String = '0.0';
  Happy: String = '0.0';
  Neutral: String = '0.0';
  Sad: String = '0.0';
  Surprised: String = '0.0';
  graphStartTime: number;
  notesData: { time: string, task: string, note: string, rColor: string }[];
  hide: boolean;
  files = [];
  videoLength = 0;
  videoInterval;
  date_time_counter = 0;
  xVal = 0;
  faceChartxVal = 0;
  faceDateTimeCounter = 0;
  isInitialChart = false;
  isUserVideo = false;
  testName;

  @ViewChild('video') video: ElementRef;
  @ViewChild('videoUser') videoUser: ElementRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.hide = true;
  }

  drawCharts() {
    let drawChartsContainerId = 'chart-Container';
    this.setEEGChartData(drawChartsContainerId);
  }

  drawFullScreenEEGChart() {
    let drawChartsContainerId = 'eeg-chart-full-Container';
    this.fullsetEEGChartData(drawChartsContainerId);
  }

  setEEGChartData(drawChartsContainerId: any) {
    this.attentiondps = []; // dataPoints
    this.relaxeddps = [];
    this.stressdps = [];
    this.counter = 0;
    this.date_time_counter = 0;
    const axisXViewportMaximum = myGlobals.date_time_data.length;
    this.xVal = myGlobals.date_time_data[this.counter];
    this.eegChart = new CanvasJS.Chart(drawChartsContainerId, {
      title: {
        text: 'EEG Data'
      },
      axisX: {
        title: 'Time',
        viewportMinimum: 0,
        viewportMaximum: axisXViewportMaximum,
        interval: 10,
        // tickThickness: 2,
        stripLines: [
          {
            color: '#FF0000',
            showOnTop: true
          }
        ]
      },
      axisY: {
        title: 'Data',
        includeZero: false,
        viewportMinimum: 0,
        viewportMaximum: 150,
        interval: 50,
        gridThickness: 0
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        verticalAlign: 'top',
        horizontalAlign: 'center',
        dockInsidePlotArea: true,
        itemclick: toogleDataSeries
      },
      data: [
        {
          type: 'spline',
          name: 'Attention',
          xValueFormatString: 'Time: ' + formatXValue(this.xVal),
          color: '#4F81BC',
          showInLegend: true,
          markerSize: 0,
          dataPoints: this.attentiondps
        },
        {
          type: 'spline',
          name: 'Relaxed',
          xValueFormatString: 'Time: ' + formatXValue(this.xVal),
          color: '#9BBB58',
          showInLegend: true,
          markerSize: 0,
          dataPoints: this.relaxeddps
        },
        {
          type: 'spline',
          name: 'Stress',
          xValueFormatString: 'Time: ' + formatXValue(this.xVal),
          color: '#C0504E',
          showInLegend: true,
          markerSize: 0,
          dataPoints: this.stressdps
        }
      ]
    });

    function toogleDataSeries(e) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }

      this.eegChart.render();
    }

    function formatXValue(xValue) {
      let seconds = formatTime(xValue % 60);
      let minutes = formatTime(xValue / 60);
      return seconds + ':' + minutes;
    }

    function formatTime(time) {
      let xValueTime = parseInt(time) + "";
      if (xValueTime.length < 2) {
        return "0" + xValueTime;
      } else {
        return xValueTime;
      }
    }
  }

  fullsetEEGChartData(drawChartsContainerId: any) {
    this.fullattentiondps = []; // dataPoints
    this.fullrelaxeddps = [];
    this.fullstressdps = [];
    this.fullcounter = 0;
    this.fulldate_time_counter = 0;
    const axisXViewportMaximum = myGlobals.date_time_data.length;
    this.fullxVal = myGlobals.date_time_data[this.fullcounter];
    this.fullEEgchart = new CanvasJS.Chart(drawChartsContainerId, {
      title: {
        text: 'EEG Data'
      },
      axisX: {
        title: 'Time',
        viewportMinimum: 0,
        viewportMaximum: axisXViewportMaximum,
        interval: 10,
        // tickThickness: 2,
        stripLines: [
          {
            color: '#FF0000',
            showOnTop: true
          }
        ]
      },
      axisY: {
        title: 'Data',
        includeZero: false,
        viewportMinimum: 0,
        viewportMaximum: 150,
        interval: 50,
        gridThickness: 0
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        verticalAlign: 'top',
        horizontalAlign: 'center',
        dockInsidePlotArea: true,
        itemclick: toogleDataSeries
      },
      data: [
        {
          type: 'spline',
          name: 'Attention',
          xValueFormatString: 'Time: ' + formatXValue(this.fullxVal),
          color: '#4F81BC',
          showInLegend: true,
          markerSize: 0,
          dataPoints: this.fullattentiondps
        },
        {
          type: 'spline',
          name: 'Relaxed',
          xValueFormatString: 'Time: ' + formatXValue(this.fullxVal),
          color: '#9BBB58',
          showInLegend: true,
          markerSize: 0,
          dataPoints: this.fullrelaxeddps
        },
        {
          type: 'spline',
          name: 'Stress',
          xValueFormatString: 'Time: ' + formatXValue(this.fullxVal),
          color: '#C0504E',
          showInLegend: true,
          markerSize: 0,
          dataPoints: this.fullstressdps
        }
      ]
    });

    function toogleDataSeries(e) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }

      this.fullEEgchart.render();
    }

    function formatXValue(xValue) {
      let seconds = formatTime(xValue % 60);
      let minutes = formatTime(xValue / 60);
      return seconds + ':' + minutes;
    }

    function formatTime(time) {
      let xValueTime = parseInt(time) + "";
      if (xValueTime.length < 2) {
        return "0" + xValueTime;
      } else {
        return xValueTime;
      }
    }
  }

  // Facial expression chart
  faceExpressionsDrawChart() {
    let faceExpDrawChartContainerId = 'face-expressions-chart-Container';
    this.setFaceExpressionChartData(faceExpDrawChartContainerId);
  }

  drawChartFullScreenfaceExpressions() {
    let faceExpDrawChartContainerId = 'face-expressions-chart-full-Container';
    this.fullsetFaceExpressionChartData(faceExpDrawChartContainerId);
  }

  setFaceExpressionChartData(faceExpDrawChartContainerId: string) {
    this.angryExpdps = []; // dataPoints
    this.disgustedExpdps = [];
    this.fearfulExpdps = [];
    this.happyExpdps = [];
    this.sadExpdps = [];
    this.surprisedExpdps = [];
    this.neutralExpdps = [];
    this.faceCounter = 0;
    this.faceDateTimeCounter = 0;
    const axisXViewportMaximum = myGlobals.dateTimeExpData.length;
    this.faceChartxVal = myGlobals.dateTimeExpData[this.faceCounter];
    this.faceChart = new CanvasJS.Chart(faceExpDrawChartContainerId, {
      theme: "light1",
      title: {
        text: 'Facial Expression Data'
      },
      axisX: {
        title: 'Time',
        viewportMinimum: 0,
        viewportMaximum: axisXViewportMaximum,
        interval: 10,
        stripLines: [
          {
            color: '#FF0000',
            showOnTop: true
          }
        ]
      },
      axisY: {
        title: 'Data',
        gridThickness: 0,
        includeZero: false,
        viewportMinimum: 0,
        viewportMaximum: 150,
        interval: 50
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        verticalAlign: 'top',
        horizontalAlign: 'center',
        dockInsidePlotArea: true,
        itemclick: toogleDataSeries
      },
      data: [
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Happy',
          xValueFormatString: 'Time: ' + formatXValue(this.faceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#8df068',
          // markerType: 'none',
          dataPoints: this.happyExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Surprised',
          xValueFormatString: 'Time :' + formatXValue(this.faceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#fbc54a',
          // markerType: 'none',
          dataPoints: this.surprisedExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Neutral',
          xValueFormatString: 'Time :' + formatXValue(this.faceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#b7b7b3',
          // markerType: 'none',
          dataPoints: this.neutralExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Fearful',
          xValueFormatString: 'Time :' + formatXValue(this.faceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#fbc54a',
          // markerType: 'none',
          dataPoints: this.fearfulExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Sad',
          xValueFormatString: 'Time :' + formatXValue(this.faceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#5099d4',
          // markerType: 'none',
          dataPoints: this.sadExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Disgusted',
          xValueFormatString: 'Time :' + formatXValue(this.faceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#7e2653',
          // markerType: 'none',
          dataPoints: this.disgustedExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Angry',
          xValueFormatString: 'Time :' + formatXValue(this.faceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#e41306',
          dataPoints: this.angryExpdps
        }
      ]
    });

    let angryExp_yVal = myGlobals.angryExpData[this.counter];
    let disgustedExp_yVal = myGlobals.disgustedExpData[this.counter];
    let fearfulExp_yVal = myGlobals.fearfulExpData[this.counter];
    let happyExp_yVal = myGlobals.happyExpData[this.counter];
    let sadExp_yVal = myGlobals.sadExpData[this.counter];
    let surprisedExp_yVal = myGlobals.surprisedExpData[this.counter];
    let neutralExp_yVal = myGlobals.neutralExpData[this.counter];

    this.Angry = angryExp_yVal;
    this.Disgusted = disgustedExp_yVal;
    this.Fearful = fearfulExp_yVal;
    this.Happy = happyExp_yVal;
    this.Sad = sadExp_yVal;
    this.Surprised = surprisedExp_yVal;
    this.Neutral = neutralExp_yVal;

    function toogleDataSeries(e) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      this.faceChart.render();
    }


    function formatXValue(xValue) {
      let seconds = formatTime(xValue % 60);
      let minutes = formatTime(xValue / 60);
      return seconds + ':' + minutes;
    }
    function formatTime(time) {
      let xValueTime = parseInt(time) + "";
      if (xValueTime.length < 2) {
        return "0" + xValueTime;
      } else {
        return xValueTime;
      }
    }

  }

  fullsetFaceExpressionChartData(faceExpDrawChartContainerId: string) {
    this.fullfaceangryExpdps = []; // dataPoints
    this.fullfacedisgustedExpdps = [];
    this.fullfacefearfulExpdps = [];
    this.fullfacehappyExpdps = [];
    this.fullfacesadExpdps = [];
    this.fullfacesurprisedExpdps = [];
    this.fullfaceneutralExpdps = [];
    this.fullfaceCounter = 0;
    this.fullfacedate_time_counter = 0;
    const axisXViewportMaximum = myGlobals.dateTimeExpData.length;
    this.fullfaceChartxVal = myGlobals.dateTimeExpData[this.fullfaceCounter];
    this.fullfacechart = new CanvasJS.Chart(faceExpDrawChartContainerId, {
      theme: "light1",
      title: {
        text: 'Facial Expression Data'
      },
      axisX: {
        title: 'Time',
        viewportMinimum: 0,
        viewportMaximum: axisXViewportMaximum,
        interval: 10,
        stripLines: [
          {
            color: '#FF0000',
            showOnTop: true
          }
        ]
      },
      axisY: {
        title: 'Data',
        gridThickness: 0,
        includeZero: false,
        viewportMinimum: 0,
        viewportMaximum: 150,
        interval: 50
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        verticalAlign: 'top',
        horizontalAlign: 'center',
        dockInsidePlotArea: true,
        itemclick: toogleDataSeries
      },
      data: [
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Happy',
          xValueFormatString: 'Time: ' + formatXValue(this.fullfaceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#8df068',
          // markerType: 'none',
          dataPoints: this.fullfacehappyExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Surprised',
          xValueFormatString: 'Time :' + formatXValue(this.fullfaceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#fbc54a',
          // markerType: 'none',
          dataPoints: this.fullfacesurprisedExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Neutral',
          xValueFormatString: 'Time :' + formatXValue(this.fullfaceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#b7b7b3',
          // markerType: 'none',
          dataPoints: this.fullfaceneutralExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Fearful',
          xValueFormatString: 'Time :' + formatXValue(this.fullfaceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#fbc54a',
          // markerType: 'none',
          dataPoints: this.fullfacefearfulExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Sad',
          xValueFormatString: 'Time :' + formatXValue(this.fullfaceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#5099d4',
          // markerType: 'none',
          dataPoints: this.fullfacesadExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Disgusted',
          xValueFormatString: 'Time :' + formatXValue(this.fullfaceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#7e2653',
          // markerType: 'none',
          dataPoints: this.fullfacedisgustedExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Angry',
          xValueFormatString: 'Time :' + formatXValue(this.fullfaceChartxVal),
          showInLegend: true,
          markerSize: 0,
          color: '#e41306',
          dataPoints: this.fullfaceangryExpdps
        }
      ]
    });

    let angryExp_yVal = myGlobals.angryExpData[this.fullfaceCounter];
    let disgustedExp_yVal = myGlobals.disgustedExpData[this.fullfaceCounter];
    let fearfulExp_yVal = myGlobals.fearfulExpData[this.fullfaceCounter];
    let happyExp_yVal = myGlobals.happyExpData[this.fullfaceCounter];
    let sadExp_yVal = myGlobals.sadExpData[this.fullfaceCounter];
    let surprisedExp_yVal = myGlobals.surprisedExpData[this.fullfaceCounter];
    let neutralExp_yVal = myGlobals.neutralExpData[this.fullfaceCounter];

    this.Angry = angryExp_yVal;
    this.Disgusted = disgustedExp_yVal;
    this.Fearful = fearfulExp_yVal;
    this.Happy = happyExp_yVal;
    this.Sad = sadExp_yVal;
    this.Surprised = surprisedExp_yVal;
    this.Neutral = neutralExp_yVal;

    function toogleDataSeries(e) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      this.fullfacechart.render();
    }


    function formatXValue(xValue) {
      let seconds = formatTime(xValue % 60);
      let minutes = formatTime(xValue / 60);
      return seconds + ':' + minutes;
    }
    function formatTime(time) {
      let xValueTime = parseInt(time) + "";
      if (xValueTime.length < 2) {
        return "0" + xValueTime;
      } else {
        return xValueTime;
      }
    }

  }

  updateEEGChart() {
    const self = this;
    for (let j = 0; j < 1; j++) {
      if (self.attentiondps.length === myGlobals.attention_data.length - 1) {
        return;
      }
      let xVal = myGlobals.date_time_data[self.counter];
      let attention_yVal = parseInt(myGlobals.attention_data[self.counter]);
      let relaxed_yVal = parseInt(myGlobals.relaxed_data[self.counter]);
      let stress_yVal = parseInt(myGlobals.stress_data[self.counter]);
      self.counter++;


      self.eegChart.options.axisX.stripLines[0] = {
        value: xVal,
        thickness: 1,
        showOnTop: true
      };

      self.attentiondps.push({
        x: xVal,
        y: attention_yVal
      });
      self.relaxeddps.push({
        x: xVal,
        y: relaxed_yVal
      });
      self.stressdps.push({
        x: xVal,
        y: stress_yVal
      });
      xVal = myGlobals.date_time_data[self.counter];
    }

    self.eegChart.render();
  }

  playPauseCharts() {
    const ele = document.getElementById('playPause');
    const self = this;
    if (this.flag) {
      ele.innerHTML = 'Pause';
      this.interval = setInterval(function () { self.updateEEGChart(); }, 1000);
    } else {
      ele.innerHTML = 'Play';
      clearInterval(this.interval);
    }
    this.flag = !(this.flag);
  }

  playVideo(event: any) {
    event.target.paused ? this.onVideoPlay() : this.onVideoPause();
  }

  onFileLoad(fileLoadedEvent) {
    myGlobals.date_time_data.splice(0, myGlobals.date_time_data.length);
    myGlobals.attention_data.splice(0, myGlobals.attention_data.length);
    myGlobals.relaxed_data.splice(0, myGlobals.relaxed_data.length);
    myGlobals.stress_data.splice(0, myGlobals.stress_data.length);
    const textFromFileLoaded = JSON.stringify(fileLoadedEvent.target.result);
    const local_data = (textFromFileLoaded).split('\\n');
    local_data.splice(0, 1);
    local_data.splice(local_data.length - 1, 1);
    let counter = 0;
    const firstRecord = local_data[0].split(',');
    local_data.forEach(element => {
      const tData = element.split(',');
      if (tData) {
        const flag = Number(tData[13].toString().slice(0, 1));
        if (flag) {
          myGlobals.date_time_data.push(counter);
          myGlobals.attention_data.push(tData[9]);
          myGlobals.relaxed_data.push(tData[10]);
          myGlobals.stress_data.push(tData[11]);
          counter++;
          if (counter === 1) {
            const calibrationEndString = tData[0].slice(11, 20).split(':');
            const calibrationEnd = (+calibrationEndString[0]) * 60 * 60 + (+calibrationEndString[1]) * 60 + (+calibrationEndString[2]);
            const calibrationStartString = firstRecord[0].slice(11, 20).split(':');
            const calibrationStart =
              (+calibrationStartString[0]) * 60 * 60 + (+calibrationStartString[1]) * 60 + (+calibrationStartString[2]);
            myGlobals.graphStartTime.push(Number((calibrationEnd - calibrationStart) * 1000));
          }
        }
      }
    });
  }

  calculateSeconds(hms: string) {
    const a = hms.split(':');
    const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    return seconds;
  }

  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;
      fileReader.readAsText(fileToRead, 'UTF-8');
    }
  }

  onFileSelectFaceExpressions(input: HTMLInputElement) {
    const files = input.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoadForFaceExpressions;
      fileReader.readAsText(fileToRead, 'UTF-8');
    }
  }

  onFileLoadForFaceExpressions(fileLoadedEvent) {
    myGlobals.dateTimeExpData.splice(0, myGlobals.dateTimeExpData.length);
    myGlobals.angryExpData.splice(0, myGlobals.angryExpData.length);
    myGlobals.disgustedExpData.splice(0, myGlobals.disgustedExpData.length);
    myGlobals.fearfulExpData.splice(0, myGlobals.fearfulExpData.length);
    myGlobals.happyExpData.splice(0, myGlobals.happyExpData.length);
    myGlobals.sadExpData.splice(0, myGlobals.sadExpData.length);
    myGlobals.surprisedExpData.splice(0, myGlobals.surprisedExpData.length);
    myGlobals.neutralExpData.splice(0, myGlobals.neutralExpData.length);
    const textFromFileLoaded = JSON.stringify(fileLoadedEvent.target.result);
    const local_data = (textFromFileLoaded).split('\\n');
    local_data.splice(0, 1);
    local_data.splice(local_data.length - 1, 1);
    let counter = 0;
    const firstRecord = local_data[0].split(',');
    local_data.forEach(element => {
      const tData = element.split(',');
      const flag = Number(tData[8].toString().slice(0, 1));
      if (flag) {
        myGlobals.dateTimeExpData.push(counter);
        myGlobals.angryExpData.push(tData[1]);
        myGlobals.disgustedExpData.push(tData[2]);
        myGlobals.fearfulExpData.push(tData[3]);
        myGlobals.happyExpData.push(tData[4]);
        myGlobals.sadExpData.push(tData[5]);
        myGlobals.surprisedExpData.push(tData[6]);
        myGlobals.neutralExpData.push(tData[7]);
        counter++;
        if (counter === 1) {
          const calibrationEndString = tData[0].slice(11, 20).split(':');
          const calibrationEnd = (+calibrationEndString[0]) * 60 * 60 + (+calibrationEndString[1]) * 60 + (+calibrationEndString[2]);
          const calibrationStartString = firstRecord[0].slice(11, 20).split(':');
          const calibrationStart =
            (+calibrationStartString[0]) * 60 * 60 + (+calibrationStartString[1]) * 60 + (+calibrationStartString[2]);
          myGlobals.graphStartTimeFacial.push(Number((calibrationEnd - calibrationStart) * 1000));
        }
      }
    });
  }

  playSelectedFile(event) {
    const file = event.target.files[0];
    const videoNode = document.querySelector('video');
  }

  playCharts() {

    if (this.files.length === 0) {
      alert('Please upload the test file..!');
      return;
    }
    this.hide = false;
    const ele = document.getElementById('playPause');
    const self = this;
    if (!this.flag) {
      const videoList = document.getElementsByTagName('video');
      if (this.isInitialChart) {
        setTimeout(() => {
          if (myGlobals.attention_data.length === 0) {
            return;
          }
          this.notesData = myGlobals.notesData.slice(0, myGlobals.videoObj.videoLength + 1);
          this.drawCharts();
          this.faceExpressionsDrawChart();
          this.drawFullScreenEEGChart();
          this.drawChartFullScreenfaceExpressions();
          this.onVideoPlay();
        }, 0);


        this.isInitialChart = false;
      }
      else {
        this.onVideoPlay();

      }
    } else {
      this.onVideoPause();
    }

    this.flag = !(this.flag);
  }

  initiateGraphs() {
    myGlobals.date_time_data.splice(0, myGlobals.date_time_data.length - 1);
    myGlobals.attention_data.splice(0, myGlobals.attention_data.length - 1);
    myGlobals.relaxed_data.splice(0, myGlobals.relaxed_data.length - 1);
    myGlobals.stress_data.splice(0, myGlobals.stress_data.length - 1);
    myGlobals.dateTimeExpData.splice(0, myGlobals.dateTimeExpData.length - 1);
    myGlobals.angryExpData.splice(0, myGlobals.angryExpData.length - 1);
    myGlobals.disgustedExpData.splice(0, myGlobals.disgustedExpData.length - 1);
    myGlobals.fearfulExpData.splice(0, myGlobals.fearfulExpData.length - 1);
    myGlobals.happyExpData.splice(0, myGlobals.happyExpData.length - 1);
    myGlobals.sadExpData.splice(0, myGlobals.sadExpData.length - 1);
    myGlobals.surprisedExpData.splice(0, myGlobals.surprisedExpData.length - 1);
    myGlobals.neutralExpData.splice(0, myGlobals.neutralExpData.length - 1);
    myGlobals.notesData.splice(0, myGlobals.notesData.length - 1);
  }

  getfolder(e) {
    this.hide = true;
    this.isInitialChart = true;
    this.files = Array.from(e.target.files);
    for (let ii = 0; ii < this.files.length; ii++) {
      const arrFilename = (this.files[ii].name).split('_');
      if (arrFilename[arrFilename.length - 1] === 'EEG.csv') {
        this.testName = arrFilename[0];
        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoad;
        fileReader.readAsText(this.files[ii], 'UTF-8');

      } else if (arrFilename[arrFilename.length - 1] === 'Facial.csv') {
        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoadForFaceExpressions;
        fileReader.readAsText(this.files[ii], 'UTF-8');
      } else if (arrFilename[arrFilename.length - 1] === 'Video.mp4') {
        const fileURL = URL.createObjectURL(this.files[ii]);
        const videoNode = this.video.nativeElement;
        videoNode.src = URL.createObjectURL(this.files[ii]);
      } else if (arrFilename[arrFilename.length - 1] === 'User.mp4') {
        this.isUserVideo = true; // True to show the user video;
        const videoUser = this.videoUser.nativeElement;
        videoUser.src = URL.createObjectURL(this.files[ii]);
      }
    }
  }

  onFileLoadNotes(fileLoadedEvent) {
    myGlobals.notesData.splice(0, myGlobals.notesData.length);
    const textFromFileLoaded = JSON.stringify(fileLoadedEvent.target.result);
    const local_data = (textFromFileLoaded).split('\\n');
    let preColor = null;
    for (let i = 0; i < myGlobals.videoObj.videoLength; i++) {
      if (i > 0) {
        const tData = local_data[i].split(',');
        let rcolor = null;
        if (tData[1]) {

          if (tData[1].toString().toLowerCase().includes('start')) {
            // Get rendom color
            rcolor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            preColor = rcolor;
          }
          else if (tData[1].toString().toLowerCase().includes('end')) {
            rcolor = preColor;
          }
        }

        myGlobals.notesData.push({ time: tData[0], task: tData[1], note: tData[2] ? tData[2].slice(0, -2) : '', rColor: rcolor });
      }
    }
  }

  initialPlayVideo(initialVideo: any) {
    initialVideo.play();
  }

  initialPauseVideo(pauseVideo: any) {
    pauseVideo.pause();
  }

  onVideoPlay() {
    let count = 0;
    let self = this;
    self.onPlayVideo();
    this.videoInterval = setInterval(function () {

      self.updateChart();
      self.fullupdateChart();
      self.faceupdateChart();
      self.fullFaceupdateChart();

    }, 1000);
  }

  onPlayVideo() {
    const videoList = document.getElementsByTagName('video');
    if (this.isInitialChart) {

      for (let i = 0; i < videoList.length; i++) {
        videoList[i].load();
        videoList[i].paused ? this.initialPlayVideo(videoList[i]) : this.initialPauseVideo(videoList[i]);
      }
    }
    else {
      for (let i = 0; i < videoList.length; i++) {
        this.initialPlayVideo(videoList[i]);
      }
    }
  }

  onVideoPause() {
    clearInterval(this.videoInterval);
    const videoList = document.getElementsByTagName('video');
    for (let i = 0; i < videoList.length; i++) {
      this.initialPauseVideo(videoList[i]);
    }
  }


  updateChart() {

    for (let j = 0; j < 1; j++) {
      if (this.attentiondps.length === myGlobals.attention_data.length - 1) {
        this.flag = false;
        this.isInitialChart = true;
        return;
      }
      let attention_yVal = parseInt(myGlobals.attention_data[this.counter]);
      let relaxed_yVal = parseInt(myGlobals.relaxed_data[this.counter]);
      let stress_yVal = parseInt(myGlobals.stress_data[this.counter]);
      this.counter++;
      this.eegChart.options.axisX.stripLines[0] = {
        value: this.xVal,
        thickness: 1,
        showOnTop: true
      };

      this.attentiondps.push({
        x: this.xVal,
        y: attention_yVal
      });
      this.relaxeddps.push({
        x: this.xVal,
        y: relaxed_yVal
      });
      this.stressdps.push({
        x: this.xVal,
        y: stress_yVal
      });
      this.date_time_counter++;
      this.xVal = myGlobals.date_time_data[this.date_time_counter];
    }
    this.eegChart.render();
  }

  faceupdateChart() {
    let self = this;
    for (let j = 0; j < 1; j++) {
      if (this.angryExpdps.length === myGlobals.angryExpData.length - 1) {
        return;
      }
      let angryExp_yVal = parseFloat(myGlobals.angryExpData[this.faceCounter]);
      let disgustedExp_yVal = parseFloat(myGlobals.disgustedExpData[this.faceCounter]);
      let fearfulExp_yVal = parseFloat(myGlobals.fearfulExpData[this.faceCounter]);
      let happyExp_yVal = parseFloat(myGlobals.happyExpData[this.faceCounter]);
      let sadExp_yVal = parseFloat(myGlobals.sadExpData[this.faceCounter]);
      let surprisedExp_yVal = parseFloat(myGlobals.surprisedExpData[this.faceCounter]);
      let neutralExp_yVal = parseFloat(myGlobals.neutralExpData[this.faceCounter]);
      this.faceCounter++;

      self.Angry = angryExp_yVal.toString();
      self.Disgusted = disgustedExp_yVal.toString();
      self.Fearful = fearfulExp_yVal.toString();
      self.Happy = happyExp_yVal.toString();
      self.Sad = sadExp_yVal.toString();
      self.Surprised = surprisedExp_yVal.toString();
      self.Neutral = neutralExp_yVal.toString();

      this.faceChart.options.axisX.stripLines[0] = {
        value: this.faceChartxVal,
        thickness: 1,
        showOnTop: true
      };


      this.angryExpdps.push({
        x: this.faceChartxVal,
        y: angryExp_yVal
      });
      this.disgustedExpdps.push({
        x: this.faceChartxVal,
        y: disgustedExp_yVal
      });
      this.fearfulExpdps.push({
        x: this.faceChartxVal,
        y: fearfulExp_yVal
      });
      this.happyExpdps.push({
        x: this.faceChartxVal,
        y: happyExp_yVal
      });
      this.sadExpdps.push({
        x: this.faceChartxVal,
        y: sadExp_yVal
      });
      this.surprisedExpdps.push({
        x: this.faceChartxVal,
        y: surprisedExp_yVal
      });
      this.neutralExpdps.push({
        x: this.faceChartxVal,
        y: neutralExp_yVal
      });
      this.faceDateTimeCounter++;
      this.faceChartxVal = myGlobals.dateTimeExpData[this.faceCounter];
    }
    this.faceChart.render();
  }

  fullupdateChart() {

    for (let j = 0; j < 1; j++) {
      if (this.attentiondps.length === myGlobals.attention_data.length - 1) {
        return;
      }
      let attention_yVal = parseInt(myGlobals.attention_data[this.fullcounter]);
      let relaxed_yVal = parseInt(myGlobals.relaxed_data[this.fullcounter]);
      let stress_yVal = parseInt(myGlobals.stress_data[this.fullcounter]);
      this.fullcounter++;
      this.fullEEgchart.options.axisX.stripLines[0] = {
        value: this.fullxVal,
        thickness: 1,
        showOnTop: true
      };

      this.fullattentiondps.push({
        x: this.fullxVal,
        y: attention_yVal
      });
      this.fullrelaxeddps.push({
        x: this.fullxVal,
        y: relaxed_yVal
      });
      this.fullstressdps.push({
        x: this.fullxVal,
        y: stress_yVal
      });
      this.fulldate_time_counter++;
      this.fullxVal = myGlobals.date_time_data[this.fulldate_time_counter];
    }

    this.fullEEgchart.render();

  }

  fullFaceupdateChart() {

    let self = this;
    for (let j = 0; j < 1; j++) {
      if (this.fullfaceangryExpdps.length === myGlobals.angryExpData.length - 1) {
        return;
      }
      let angryExp_yVal = parseFloat(myGlobals.angryExpData[this.fullfaceCounter]);
      // this.updateEEGVal(angryExp_yVal);
      // self.angry = angryExp_yVal;
      let disgustedExp_yVal = parseFloat(myGlobals.disgustedExpData[this.fullfaceCounter]);
      let fearfulExp_yVal = parseFloat(myGlobals.fearfulExpData[this.fullfaceCounter]);
      let happyExp_yVal = parseFloat(myGlobals.happyExpData[this.fullfaceCounter]);
      let sadExp_yVal = parseFloat(myGlobals.sadExpData[this.fullfaceCounter]);
      let surprisedExp_yVal = parseFloat(myGlobals.surprisedExpData[this.fullfaceCounter]);
      let neutralExp_yVal = parseFloat(myGlobals.neutralExpData[this.fullfaceCounter]);
      this.fullfaceCounter++;

      self.Angry = angryExp_yVal.toString();
      self.Disgusted = disgustedExp_yVal.toString();
      self.Fearful = fearfulExp_yVal.toString();
      self.Happy = happyExp_yVal.toString();
      self.Sad = sadExp_yVal.toString();
      self.Surprised = surprisedExp_yVal.toString();
      self.Neutral = neutralExp_yVal.toString();

      this.fullfacechart.options.axisX.stripLines[0] = {
        value: this.fullfaceChartxVal,
        thickness: 1,
        showOnTop: true
      };


      this.fullfaceangryExpdps.push({
        x: this.fullfaceChartxVal,
        y: angryExp_yVal
      });
      this.fullfacedisgustedExpdps.push({
        x: this.fullfaceChartxVal,
        y: disgustedExp_yVal
      });
      this.fullfacefearfulExpdps.push({
        x: this.fullfaceChartxVal,
        y: fearfulExp_yVal
      });
      this.fullfacehappyExpdps.push({
        x: this.fullfaceChartxVal,
        y: happyExp_yVal
      });
      this.fullfacesadExpdps.push({
        x: this.fullfaceChartxVal,
        y: sadExp_yVal
      });
      this.fullfacesurprisedExpdps.push({
        x: this.fullfaceChartxVal,
        y: surprisedExp_yVal
      });
      this.fullfaceneutralExpdps.push({
        x: this.fullfaceChartxVal,
        y: neutralExp_yVal
      });
      this.fullfacedate_time_counter++;
      this.fullfaceChartxVal = myGlobals.dateTimeExpData[this.fullfaceCounter];
    }
    this.fullfacechart.render();
  }


  getVideoLength(event: any, video: any) {

    // Get the test video legnth for notes
    myGlobals.videoObj.videoLength = parseInt(video.duration) + 1;
    let videoFile = this.files.filter(f => f.name.includes('_Notes'));
    const fileReader = new FileReader();
    fileReader.onload = this.onFileLoadNotes;
    fileReader.readAsText(videoFile[0], 'UTF-8');

  }

  reset() {
    this.hide = true;
    this.notesData = [];
    this.video.nativeElement.load();
    this.videoUser.nativeElement.load();
  }
}
