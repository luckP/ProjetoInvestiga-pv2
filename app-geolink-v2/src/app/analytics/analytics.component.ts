import { Component, OnInit } from '@angular/core';
import { ChartModel } from '../models/chart-model';
import { AnalyticsService } from './analytics.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DashBoardModel } from '../models/dashboard-model';
import { interval } from 'rxjs';
import { AuthService } from '../auth.service';
import { NavBarService } from '../nav-bar-service.service';
import { AnalyticsAddComponent } from './analytics-add/analytics-add.component';
import { AnalyticsChartAddComponent } from './analytics-chart-add/analytics-chart-add.component';

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

  constructor( 
    private analyticsService: AnalyticsService, 
    private snackBar: MatSnackBar, 
    private auth: AuthService,
    public nav: NavBarService,
    public dialog: MatDialog,

    ) { }
  
  public chartsSize:any[] = [
    {'label': '33.3%', 'val': 'col-md-4'},
    {'label': '50%', 'val': 'col-md-6'},
    {'label': '66.6%', 'val': 'col-md-8'},
    {'label': '100%', 'val': 'col-md-12'},
  ];

  ngOnInit() {
    this.auth.checkLoged();
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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AnalyticsAddComponent, {
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createChartDialog(){
    const dialogRef = this.dialog.open(AnalyticsChartAddComponent, {
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
