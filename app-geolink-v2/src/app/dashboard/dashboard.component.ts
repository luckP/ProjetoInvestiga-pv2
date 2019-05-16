import { Component, OnInit } from '@angular/core';
import { ChartModel } from '../models/chart-model';
import { DashboardService } from './dashboard.service';
import { MatSnackBar } from '@angular/material';
import { DashBoardModel } from '../models/dashboard-model';
import { interval } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import { MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public charts: ChartModel[];
  public dashboards: DashBoardModel[];
  public dashboardSelected: DashBoardModel;
  public progressBarVal: any = 0;

  private data: any = this.dashboardService.loadData();
  public dataBox: any = {'in': [0,0], 'out': [0,0], 'out_error': [0,0]};
  public dataLine: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'In' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Out' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Out_error', yAxisID: 'y-axis-1' }
  ];

  public dataDoughnut:MultiDataSet = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

   public dataRadar: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'In' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Out' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Out_error' }
  ];

  public chartsSize:any[] = [
    {'label': '33.3%', 'val': 'col-md-4'},
    {'label': '50%', 'val': 'col-md-6'},
    {'label': '66.6%', 'val': 'col-md-8'},
    {'label': '100%', 'val': 'col-md-12'},
  ];
  constructor( private dashboardService: DashboardService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.charts = this.dashboardService.loadDashBoard();
    this.dashboards = this.dashboardService.loadDashboardsList();
    this.dashboardSelected = this.dashboards[0];

    // alterar depois
    this.loadProgressBar();
    this.consumData();

  }

  selectDashboard(dashboard: DashBoardModel):void{
    this.dashboardSelected = dashboard;
  }

  loadProgressBar():void{
    //output: 0
    const subscribe = interval(100)
    .subscribe(val => {
      if(this.progressBarVal == 100){
        setTimeout(()=> {subscribe.unsubscribe(); this.progressBarVal = false}, 500);
        // subscribe.unsubscribe();
      }
      else{
        this.progressBarVal+=10;
      }
    });
    // setTimeout(()=> subscribe.unsubscribe(), 100000);
  }

  private consumData():void{

    // MELHORAR... ESTA MUIRO GRANDE E REPETITIVA


    for(let data of this.data){
      // DATA_BOX
      this.dataBox[data['type']][1]++;

      // LINE
      var date = new Date(data['timestamp']);
      switch(data['type']){
        case 'in':{
          // @ts-ignore
          this.dataLine[0].data[date.getMonth()]++;
        }break;
        case 'out':{
          // @ts-ignore
          this.dataLine[1].data[date.getMonth()]++;
        }break;
        case 'out_error':{
          // @ts-ignore
          this.dataLine[2].data[date.getMonth()]++;
        }break;
        default:{
          console.error(data['type']);
        }
      }
        
      // DOUGHNUT

      // p: 3 4 5
      // v: 6 7 8
      // o: 9 10 11
      // i: 0 1 2 
      let season: number;
      if([0, 1, 2].includes(date.getMonth())){
        // winter
        season = 0;
      }
      else if([3, 4, 5].includes(date.getMonth())){
        // spring
        season = 1;
      }

      else if([6, 7, 8].includes(date.getMonth())){
        // summer
        season = 2;
      }
      else if([9, 10, 11].includes(date.getMonth())){
        // autumn
        season = 3;
      }

      switch(data['type']){
        case 'in':{
          // @ts-ignore
          this.dataDoughnut[0][season]++;
        }break;
        case 'out':{
          // @ts-ignore
          this.dataDoughnut[1][season]++;
        }break;
        case 'out_error':{
          // @ts-ignore
          this.dataDoughnut[2][season]++;
        }break;
        default:{
          console.error(data['type']);
        }
      }

      // RADAR

      let day = date.getDay();
      console.log(day);
      
      switch(data['type']){
        case 'in':{
          // @ts-ignore
          this.dataRadar[0][day]++;
        }break;
        case 'out':{
          // @ts-ignore
          this.dataRadar[1][day]++;
        }break;
        case 'out_error':{
          // @ts-ignore
          this.dataRadar[2][day]++;
        }break;
        default:{
          console.error(data['type']);
        }
      }


    }

    console.log( this.dataDoughnut);
    
    
  } 
}
