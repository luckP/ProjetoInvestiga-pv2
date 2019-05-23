import { Component, OnInit, Input } from '@angular/core';
import { ChartModel } from '../models/chart-model';
import { DashboardService } from '../dashboard/dashboard.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.css']
})
export class ChartCardComponent implements OnInit {

  @Input() chart: ChartModel;

  public chartsSize:any[] = [
    {'label': '33.3%', 'val': 'col-md-4'},
    {'label': '50%', 'val': 'col-md-6'},
    {'label': '66.6%', 'val': 'col-md-8'},
    {'label': '100%', 'val': 'col-md-12'},
  ];
  constructor( 
    private dashboardService: DashboardService, 
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
  }

  lockChart(chart:ChartModel):void{
    chart.lock = !chart.lock;
    this.snackBar.open('Chart lock', (chart.lock+''), {
      duration: 2000,
    });
  }

}
