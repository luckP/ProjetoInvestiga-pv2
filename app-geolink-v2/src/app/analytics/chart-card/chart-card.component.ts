import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../dashboard/dashboard.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AnalyticsChartModel } from 'src/app/models/analyticsChart';
import { AnalyticsService } from '../analytics.service';
import { AnalyticsChartDeleteComponent } from '../analytics-chart-delete/analytics-chart-delete.component';
declare var $:any;

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.css']
})
export class ChartCardComponent implements OnInit {

  @Input() chart: AnalyticsChartModel;

  public chartsSize:any[] = [
    {'label': '33.3%', 'val': 'col-md-4'},
    {'label': '50%', 'val': 'col-md-6'},
    {'label': '66.6%', 'val': 'col-md-8'},
    {'label': '100%', 'val': 'col-md-12'},
  ];
  constructor( 
    private analyticsService: AnalyticsService, 
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    // this.chartView = this.chart.chart;
  }

  lockChart(chart:AnalyticsChartModel):void{
    chart.chart.lock = !chart.chart.lock;
    this.snackBar.open('Chart lock', (chart.chart.lock+''), {
      duration: 2000,
    });
    this.editSimpleCard();
  }

  onClickDelete(){
    const dialogRef = this.dialog.open(AnalyticsChartDeleteComponent, {
      width: '350px',
      data: {id: this.chart.chart.id}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Edit parameters that don't neet to confirm
  editSimpleCard(){
    let chart:any = {
      'id': this.chart.chart.id,
      'analytics_id': this.chart.analytics_id,
      'title':this.chart.chart.title,
      'subtitle':this.chart.chart.subtitle,
      'chartSize':this.chart.chart.chartSize,
      'lock':this.chart.chart.lock,
      'chartType':this.chart.chart.chartType,
      'show_legends':(this.chart.chart.show_legends),
      'square_id':this.chart.square_id,
      'analytics_chart_timestamp':this.chart.analytics_chart_timestamp,
      'position_index':this.chart.position_index,
      'smart':this.chart.smart,
    }
    this.analyticsService.editChart(chart)
      .subscribe(
        resp=>{
          
        },
        err=>{
          console.error('editSimpleCard');
          this.snackBar.open('Fail to connect to server', ('=('), {
            duration: 2000,
          });
        });
    }
  }
    