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
import { ActivatedRoute } from '@angular/router';
import { AnalyticsModel } from '../models/analytics';
import { AnalyticsChartModel } from '../models/analyticsChart';
declare var $: any;
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  public charts: AnalyticsChartModel[] =[];
  public dashboards: DashBoardModel[];
  public progressBarVal: any = 0;
  public sortebleDisabled:boolean = false;
  public loadging:boolean  = true;
  public analytics: AnalyticsModel = {
    id: 0,
    id_user: this.auth.getUser().id,
    name: ''
  };

  constructor( 
    public analyticsService: AnalyticsService, 
    private snackBar: MatSnackBar, 
    private auth: AuthService,
    public nav: NavBarService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    ) { }
  
  public chartsSize:any[] = [
    {'label': '33.3%', 'val': 'col-md-4'},
    {'label': '50%', 'val': 'col-md-6'},
    {'label': '66.6%', 'val': 'col-md-8'},
    {'label': '100%', 'val': 'col-md-12'},
  ];

  ngOnInit() {
    this.auth.checkLoged();
    // this.dashboards = this.analyticsService.loadDashboardsList();
    // this.analyticsSelected = this.dashboards[0];
    this.analyticsService.getAnalyticsSelected().id

    // alterar depois
    this.loadProgressBar();
    if(this.auth.getUser().id!=0){

      this.route.paramMap.subscribe(params => {
        
        if(params.get("analytics_id")){
          
          this.analyticsService.getAnalyticsSelected().id = +params.get("analytics_id");
          this.analyticsService.loadAnalyticsData(parseInt(params.get("analytics_id")))
          .subscribe(
            resp =>{
              
              this.analyticsService.getAnalyticsSelected().id = resp.analytics.id;
              this.analyticsService.getAnalyticsSelected().name = resp.analytics.name;
              this.loadging = false;

              setTimeout(()=>{
                $( function() {
                  $( "#sortable" ).sortable({
                    disabled: this.sortebleDisabled
                  });
                  $( "#sortable" ).disableSelection();
                }
                )}, 1000);
              try{
                this.analyticsService.analyticsChartModels = resp.charts.map((chart:any) => {
                  chart =  {
                    analytics_id: resp.analytics.id,
                    chart:{
                      id: chart.id,
                      title:chart.title,
                      subtitle:chart.subtitle,
                      square_id:chart.square_id,
                      chartSize:chart.chartSize,
                      lock: chart.lock === 1,
                      datasets: [
                        { data: [], label: 'Series A' },
                        { data: [], label: 'Series B' },
                        { data: [], label: 'Series C', yAxisID: 'y-axis-1' }
                      ],
                      labels: [],
                      options: {
                        responsive: true,
                        scales: {
                          // We use this empty structure as a placeholder for dynamic theming.
                          xAxes: [{}],
                          yAxes: [
                            {
                              id: 'y-axis-0',
                              position: 'left',
                            },
                            {
                              id: 'y-axis-1',
                              position: 'right',
                              gridLines: {
                                color: 'rgba(255,0,0,0.3)',
                              },
                              ticks: {
                                fontColor: 'red',
                              }
                            }
                          ]
                        },
                        annotation: {
                          annotations: [
                            {
                              type: 'line',
                              mode: 'vertical',
                              scaleID: 'x-axis-0',
                              value: 'March',
                              borderColor: 'orange',
                              borderWidth: 2,
                              label: {
                                enabled: true,
                                fontColor: 'orange',
                                content: 'LineAnno'
                              }
                            },
                          ],
                        },
                      },
                      colors:[
                        { // grey
                          backgroundColor: 'rgba(148,159,177,0.2)',
                          borderColor: 'rgba(148,159,177,1)',
                          pointBackgroundColor: 'rgba(148,159,177,1)',
                          pointBorderColor: '#fff',
                          pointHoverBackgroundColor: '#fff',
                          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
                        },
                        { // dark grey
                          backgroundColor: 'rgba(77,83,96,0.2)',
                          borderColor: 'rgba(77,83,96,1)',
                          pointBackgroundColor: 'rgba(77,83,96,1)',
                          pointBorderColor: '#fff',
                          pointHoverBackgroundColor: '#fff',
                          pointHoverBorderColor: 'rgba(77,83,96,1)'
                        },
                        { // red
                          backgroundColor: 'rgba(255,0,0,0.3)',
                          borderColor: 'red',
                          pointBackgroundColor: 'rgba(148,159,177,1)',
                          pointBorderColor: '#fff',
                          pointHoverBackgroundColor: '#fff',
                          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
                        }
                      ],
                      show_legends:chart.show_legends === 0,

                      chartType: chart.chartType,
                      chartTypes:[
                        {'icon': 'show_chart', 'label': 'Line', 'val': 'line'},
                        {'icon': 'bar_chart', 'label': 'Bar', 'val': 'bar'}
                      ],
                    },
                    analytics_chart_timestamp:chart.analytics_chart_timestamp,
                    square_id:chart.square_id,
                    position_index:chart.position_index,
                    smart:chart.smart,
                    time_window:chart.time_window,
                    loading:true,
                  }
                  // make search
                  chart.chart['time_window'] = chart.time_window

                  const _chart = {
                    'analytics_id': chart.chart.analytics_id,
                    'title': chart.chart.title,
                    'subtitle': chart.chart.subtitle,
                    'chartSize': chart.chart.chartSize,
                    'lock': chart.chart.lock,
                    'chartType': chart.chart.chartType,
                    'analytics_chart_timestamp': chart.analytics_chart_timestamp,
                    'square_id': chart.square_id,
                    'position_index': chart.position_index,
                    'show_legends': chart.show_legends,
                    'smart': chart.smart,
                    'time_window': chart.time_window,
                  };
                  
                  this.analyticsService.loadAnalyticsChartDataById(_chart)
                    .subscribe(
                      resp=>{
                        console.log(resp);

                        chart.loading = false;
                        chart.chart.datasets = resp['data'];
                        chart.chart.labels = resp['labels'];
                      },
                      err=>{
                        this.snackBar.open('Error to contact server', ('=('), {
                          duration: 2000
                        });
                      }
                    );
                  
                  return chart;
                });

              }catch(err){
                console.error('error'); 
              }
          },
          err =>{
          }
        );
      }})
    }
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
      width: '50%',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
