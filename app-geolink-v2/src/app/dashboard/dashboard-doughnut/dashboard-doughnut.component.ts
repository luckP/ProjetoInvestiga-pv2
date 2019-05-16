import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard-doughnut',
  templateUrl: './dashboard-doughnut.component.html',
  styleUrls: ['./dashboard-doughnut.component.css']
})
export class DashboardDoughnutComponent implements OnInit {
  @Input() data: MultiDataSet;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Primavera', 'Verao', 'Outono', 'Inverno'];
  public doughnutChartData: MultiDataSet = [
    [100, 450, 100, 30],
    [200, 450, 100, 30],
    [300, 450, 100, 30],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
