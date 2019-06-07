import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../dashboard/dashboard.service';
import { MatSnackBar } from '@angular/material';
import { AnalyticsChartModel } from 'src/app/models/analyticsChart';
import { AnalyticsService } from '../analytics.service';
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
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    // this.chartView = this.chart.chart;
  }

  lockChart(chart:AnalyticsChartModel):void{
    chart.chart.lock = !chart.chart.lock;
    this.snackBar.open('Chart lock', (chart.chart.lock+''), {
      duration: 2000,
    });
  }

  onClickDelete(){
    this.analyticsService.deleteChart(this.chart.chart.id)
      .subscribe(
        resp=>{
          $('#'+this.chart.chart.id).hide();

          this.snackBar.open('Delete', ('Success'), {
            duration: 2000,
          });
        },
        err=>{
          console.error('onClickDelete');
          
        }
      );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

}
