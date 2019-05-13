import { Component, OnInit } from '@angular/core';
import { ChartModel } from '../models/chart-model';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  charts: ChartModel[];






  constructor( private dashboardService: DashboardService) { }

  ngOnInit() {
    this.charts = this.dashboardService.loadDashBoard();
  }

}
