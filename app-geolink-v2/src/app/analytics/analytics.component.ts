import { Component, OnInit } from '@angular/core';
import { ChartModel } from '../models/chart-model';
import { AnalyticsService } from './analytics.service';
import { MatSnackBar } from '@angular/material';
import { DashBoardModel } from '../models/dashboard-model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  public charts: ChartModel[];
  public dashboards: DashBoardModel[];
  public analyticsSelected: DashBoardModel;
  public progressBarVal: any = 0;

  public chartsSize:any[] = [
    {'label': '33.3%', 'val': 'col-md-4'},
    {'label': '50%', 'val': 'col-md-6'},
    {'label': '66.6%', 'val': 'col-md-8'},
    {'label': '100%', 'val': 'col-md-12'},
  ];
  constructor( private analyticsService: AnalyticsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.charts = this.analyticsService.loadDashBoard();
    this.dashboards = this.analyticsService.loadDashboardsList();
    this.analyticsSelected = this.dashboards[0];

    // alterar depois
    this.loadProgressBar();

  }

  selectDashboard(dashboard: DashBoardModel):void{
    this.analyticsSelected = dashboard;
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

}
