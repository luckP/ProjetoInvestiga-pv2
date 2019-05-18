import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard-box-legend',
  templateUrl: './dashboard-box-legend.component.html',
  styleUrls: ['./dashboard-box-legend.component.css']
})
export class DashboardBoxLegendComponent implements OnInit {

  @Input() public boxes={};
  public total:number = 0;

  public icons = {
    'in': 'trending_up',
    'out': 'trending_down',
    'out_error': 'error_outline',
  }

  constructor() { }

  ngOnInit() {
    this.calcdataVal();
    console.log(this.boxes);
    
  }

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: false,
    tooltips: {
      enabled: false
  }
  };
  public pieChartColors = [
    {backgroundColor: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']},
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public calcdataVal(): void{

    for(let key in this.boxes)
      this.total+=this.boxes[key];
  }
}
