import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import * as myGlobals from '../model/global';
import { interval } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

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
  chart: any;
  attentiondps = []; // dataPoints
  relaxeddps = [];
  stressdps = [];
  flag = true;
  interval;
  counter = 0;
  Angry: String = '0.0';
  Disgusted: String = '0.0';
  Fearful: String = '0.0';
  Happy: String = '0.0';
  Neutral: String = '0.0';
  Sad: String = '0.0';
  Surprised: String = '0.0';
  graphStartTime: number;
  notesData: { time: string, task: string, note: string }[];
  hide: boolean;
  @ViewChild('video') video: ElementRef;

  constructor() { }

  ngOnInit() {
    this.hide = true;
  }

  drawAttentionChart() {
    const dps = []; // dataPoints
    let attention_counter = 0;
    let date_time_counter = 0;
    const chart = new CanvasJS.Chart('attention-chart-Container', {
      title: {
        text: 'Attention Data'
      },
      axisX: {
        title: 'Time',
        viewportMinimum: 0,
        viewportMaximum: 150,
        interval: 10
      },
      axisY: {
        title: 'Attention',
        includeZero: false,
      },
      data: [{
        type: 'spline',
        markerType: 'none',
        dataPoints: dps
      }]
    });
    let xVal = myGlobals.date_time_data[date_time_counter];
    let yVal = myGlobals.attention_data[attention_counter];  // 100
    const updateInterval = 100;
    function updateChart(count) {
      for (let j = 0; j < 1; j++) {
        if (dps.length === 143) {   // 143
          return;
        }
        yVal = parseInt(myGlobals.attention_data[attention_counter]);
        attention_counter++;
        dps.push({
          x: xVal,
          y: yVal
        });
        date_time_counter++;
        xVal = myGlobals.date_time_data[date_time_counter];
      }
      chart.render();
    }
    chart.render();
    setInterval(function () { updateChart(1); }, updateInterval);
  }

  drawRelaxedChart() {
    const dps = []; // dataPoints
    let relaxed_counter = 0;
    let date_time_counter = 0;
    const chart = new CanvasJS.Chart('relaxed-chart-Container', {
      title: {
        text: 'Relaxed Data'
      },
      axisX: {
        title: 'Time',
        viewportMinimum: 0,
        viewportMaximum: 150,
        interval: 10
      },
      axisY: {
        title: 'Relaxed Data',
        includeZero: false
      },
      data: [{
        type: 'spline',
        markerType: 'none',
        // fillOpacity: .3,
        dataPoints: dps
      }]
    });
    let xVal = myGlobals.date_time_data[date_time_counter];
    let yVal = myGlobals.relaxed_data[relaxed_counter];  // 100
    const updateInterval = 100;
    function updateChart(count) {
      for (let j = 0; j < 1; j++) {
        if (dps.length === 143) {   // 143
          return;
        }
        yVal = parseInt(myGlobals.relaxed_data[relaxed_counter]);
        relaxed_counter++;
        dps.push({
          x: xVal,
          y: yVal
        });
        date_time_counter++;
        xVal = myGlobals.date_time_data[date_time_counter];
      }
      chart.render();
    }
    chart.render();
    setInterval(function () { updateChart(1); }, updateInterval);
  }

  drawStressChart() {
    const dps = []; // dataPoints
    let stress_counter = 0;
    let date_time_counter = 0;
    const chart = new CanvasJS.Chart('stress-chart-Container', {
      title: {
        text: 'Stress Data'
      },
      axisX: {
        title: 'Time',
        viewportMinimum: 0,
        viewportMaximum: 150,
        interval: 10
      },
      axisY: {
        title: 'Stress Data',
        includeZero: false
      },
      data: [{
        type: 'spline',
        markerType: 'none',
        dataPoints: dps
      }]
    });
    let xVal = myGlobals.date_time_data[date_time_counter];
    let yVal = myGlobals.stress_data[stress_counter];  // 100
    const updateInterval = 100;
    function updateChart(count) {
      for (let j = 0; j < 1; j++) {
        if (dps.length === 143) {   // 143
          return;
        }
        yVal = parseInt(myGlobals.stress_data[stress_counter]);
        stress_counter++;
        dps.push({
          x: xVal,
          y: yVal
        });
        date_time_counter++;
        xVal = myGlobals.date_time_data[date_time_counter];
      }

      chart.render();
    }
    chart.render();
    setInterval(function () { updateChart(1); }, updateInterval);
  }

  drawCharts() {
    let drawChartsContainerId = 'chart-Container';
    this.setEEGChartData(drawChartsContainerId);
  }

  drawFullScreenEEGChart() {
    let drawChartsContainerId = 'eeg-chart-full-Container';
    this.setEEGChartData(drawChartsContainerId);
  }

  setEEGChartData(drawChartsContainerId: string) {
    const attentiondps = []; // dataPoints
    const relaxeddps = [];
    const stressdps = [];
    let counter = 0;
    let date_time_counter = 0;
    const axisXViewportMaximum = myGlobals.date_time_data.length;
    const chart = new CanvasJS.Chart(drawChartsContainerId, {
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
          color: '#4F81BC',
          showInLegend: true,
          markerType: 'line',
          dataPoints: attentiondps
        },
        {
          type: 'spline',
          name: 'Relaxed',
          color: '#9BBB58',
          showInLegend: true,
          markerSize: 0,
          dataPoints: relaxeddps
        },
        {
          type: 'spline',
          name: 'Stress',
          color: '#C0504E',
          showInLegend: true,
          markerSize: 0,
          dataPoints: stressdps
        }
      ]
    });

    let xVal = myGlobals.date_time_data[counter];
    let attention_yVal = myGlobals.attention_data[counter]; // 100
    let relaxed_yVal = myGlobals.relaxed_data[counter];
    let stress_yVal = myGlobals.stress_data[counter];
    const updateInterval = 1000;
    const self = this;

    function toogleDataSeries(e) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }

    function updateChart(count) {
      for (let j = 0; j < 1; j++) {
        if (attentiondps.length === myGlobals.attention_data.length - 1) {
          return;
        }
        attention_yVal = parseInt(myGlobals.attention_data[counter]);
        relaxed_yVal = parseInt(myGlobals.relaxed_data[counter]);
        stress_yVal = parseInt(myGlobals.stress_data[counter]);
        counter++;
        chart.options.axisX.stripLines[0] = {
          value: xVal,
          thickness: 1,
          showOnTop: true
        };

        attentiondps.push({
          x: xVal,
          y: attention_yVal
        });
        relaxeddps.push({
          x: xVal,
          y: relaxed_yVal
        });
        stressdps.push({
          x: xVal,
          y: stress_yVal
        });
        date_time_counter++;
        xVal = myGlobals.date_time_data[date_time_counter];
      }

      chart.render();
    }

    chart.render();
    setInterval(function () {
      updateChart(1);
    }, updateInterval);
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


      self.chart.options.axisX.stripLines[0] = {
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

    self.chart.render();
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

  playVideo(event) {
    event.target.paused ? event.target.play() : event.target.pause();
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
    const fileURL = URL.createObjectURL(file);
    videoNode.src = fileURL;
  }

  faceExpressionsDrawChart() {
    let faceExpDrawChartContainerId = 'face-expressions-chart-Container';
    // Moved code to common method to set the face expression data
    this.setFaceExpressionChartData(faceExpDrawChartContainerId);
  }

  drawChartFullScreenfaceExpressions() {
    let faceExpDrawChartContainerId = 'face-expressions-chart-full-Container';
    // Moved code to common method to set the face expression data
    this.setFaceExpressionChartData(faceExpDrawChartContainerId);
  }

  // Common method to set the face expression chart data
  setFaceExpressionChartData(faceExpDrawChartContainerId: string) {
    let angryExpdps = []; // dataPoints
    let disgustedExpdps = [];
    let fearfulExpdps = [];
    let happyExpdps = [];
    let sadExpdps = [];
    let surprisedExpdps = [];
    let neutralExpdps = [];
    let counter = 0;
    let date_time_counter = 0;
    const axisXViewportMaximum = myGlobals.dateTimeExpData.length;
    const chart = new CanvasJS.Chart(faceExpDrawChartContainerId, {
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
          showInLegend: true,
          markerSize: 0,
          color: '#8df068',
          // markerType: 'none',
          dataPoints: happyExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Surprised',
          showInLegend: true,
          markerSize: 0,
          color: '#fbc54a',
          // markerType: 'none',
          dataPoints: surprisedExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Neutral',
          showInLegend: true,
          markerSize: 0,
          color: '#b7b7b3',
          // markerType: 'none',
          dataPoints: neutralExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Fearful',
          showInLegend: true,
          markerSize: 0,
          color: '#fbc54a',
          // markerType: 'none',
          dataPoints: fearfulExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Sad',
          showInLegend: true,
          markerSize: 0,
          color: '#5099d4',
          // markerType: 'none',
          dataPoints: sadExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Disgusted',
          showInLegend: true,
          markerSize: 0,
          color: '#7e2653',
          // markerType: 'none',
          dataPoints: disgustedExpdps
        },
        {
          type: 'spline',
          // axisYType: 'secondary',
          name: 'Angry',
          showInLegend: true,
          // markerSize: 0,
          color: '#e41306',
          markerType: 'line',
          dataPoints: angryExpdps
        }
      ]
    });

    let xVal = myGlobals.dateTimeExpData[counter];
    let angryExp_yVal = myGlobals.angryExpData[counter];
    let disgustedExp_yVal = myGlobals.disgustedExpData[counter];
    let fearfulExp_yVal = myGlobals.fearfulExpData[counter];
    let happyExp_yVal = myGlobals.happyExpData[counter];
    let sadExp_yVal = myGlobals.sadExpData[counter];
    let surprisedExp_yVal = myGlobals.surprisedExpData[counter];
    let neutralExp_yVal = myGlobals.neutralExpData[counter];

    this.Angry = angryExp_yVal;
    this.Disgusted = disgustedExp_yVal;
    this.Fearful = fearfulExp_yVal;
    this.Happy = happyExp_yVal;
    this.Sad = sadExp_yVal;
    this.Surprised = surprisedExp_yVal;
    this.Neutral = neutralExp_yVal;
    let self = this;
    const updateInterval = 1000;

    function toogleDataSeries(e) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }

    function updateChart(count) {
      for (let j = 0; j < 1; j++) {
        if (angryExpdps.length === myGlobals.angryExpData.length - 1) {
          return;
        }
        angryExp_yVal = parseFloat(myGlobals.angryExpData[counter]);
        // this.updateEEGVal(angryExp_yVal);
        // self.angry = angryExp_yVal;
        disgustedExp_yVal = parseFloat(myGlobals.disgustedExpData[counter]);
        fearfulExp_yVal = parseFloat(myGlobals.fearfulExpData[counter]);
        happyExp_yVal = parseFloat(myGlobals.happyExpData[counter]);
        sadExp_yVal = parseFloat(myGlobals.sadExpData[counter]);
        surprisedExp_yVal = parseFloat(myGlobals.surprisedExpData[counter]);
        neutralExp_yVal = parseFloat(myGlobals.neutralExpData[counter]);
        counter++;

        self.Angry = angryExp_yVal;
        self.Disgusted = disgustedExp_yVal;
        self.Fearful = fearfulExp_yVal;
        self.Happy = happyExp_yVal;
        self.Sad = sadExp_yVal;
        self.Surprised = surprisedExp_yVal;
        self.Neutral = neutralExp_yVal;

        chart.options.axisX.stripLines[0] = {
          value: xVal,
          thickness: 1,
          showOnTop: true
        };

        angryExpdps.push({
          x: xVal,
          y: angryExp_yVal
        });
        disgustedExpdps.push({
          x: xVal,
          y: disgustedExp_yVal
        });
        fearfulExpdps.push({
          x: xVal,
          y: fearfulExp_yVal
        });
        happyExpdps.push({
          x: xVal,
          y: happyExp_yVal
        });
        sadExpdps.push({
          x: xVal,
          y: sadExp_yVal
        });
        surprisedExpdps.push({
          x: xVal,
          y: surprisedExp_yVal
        });
        neutralExpdps.push({
          x: xVal,
          y: neutralExp_yVal
        });
        date_time_counter++;
        xVal = myGlobals.dateTimeExpData[counter];
      }
      chart.render();
    }

    chart.render();
    setInterval(function() {
      updateChart(1);
    }, updateInterval);
  }

  playCharts() {
    this.hide = false;
    const vid1 = document.getElementsByTagName('video');
    const temp = vid1[0];
    temp.load();
    temp.paused ? temp.play() : temp.pause();
    const videoStart = (myGlobals.graphStartTime[0] + myGlobals.graphStartTimeFacial[0]) / 2;
    setTimeout(() => {
      if (myGlobals.attention_data.length === 0) {
        return;
      }
      this.notesData = myGlobals.notesData;
      this.drawCharts();
      this.faceExpressionsDrawChart();
      this.drawFullScreenEEGChart();
      this.drawChartFullScreenfaceExpressions();
    }, 0);
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
    const files = e.target.files;
    const path = files[0].webkitRelativePath;
    let file1 = files[0].name;
    for (let ii = 0; ii < files.length; ii++) {
      const arrFilename = (files[ii].name).split('_');
      if (arrFilename[arrFilename.length - 1] === 'EEG.csv') {
        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoad;
        fileReader.readAsText(files[ii], 'UTF-8');
      } else if (arrFilename[arrFilename.length - 1] === 'Facial.csv') {
        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoadForFaceExpressions;
        fileReader.readAsText(files[ii], 'UTF-8');
      } else if (arrFilename[arrFilename.length - 1] === 'Notes.csv') {
        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoadNotes;
        fileReader.readAsText(files[ii], 'UTF-8');
      } else if (arrFilename[arrFilename.length - 1] === 'Video.mp4') {  // arrFilename[arrFilename.length - 1] === 'Video.avi'
        const videoNode = document.querySelector('video');
        const fileURL = URL.createObjectURL(files[ii]);
        videoNode.src = fileURL;
      }
    }
  }

  onFileLoadNotes(fileLoadedEvent) {
    myGlobals.notesData.splice(0, myGlobals.notesData.length);
    const textFromFileLoaded = JSON.stringify(fileLoadedEvent.target.result);
    const local_data = (textFromFileLoaded).split('\\n');
    for (let i = 0; i < local_data.length; i++) {
      if (i > 0) {
        const tData = local_data[i].split(',');
        myGlobals.notesData.push({ time: tData[0], task: tData[1], note: tData[2] ? tData[2].slice(0, -2) : '' });
      }
    }
  }

  reset() {
    this.hide = true;
    this.notesData = [];
    this.video.nativeElement.load();
  }
}
