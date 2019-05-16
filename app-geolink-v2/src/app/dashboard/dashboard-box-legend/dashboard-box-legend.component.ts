import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-box-legend',
  templateUrl: './dashboard-box-legend.component.html',
  styleUrls: ['./dashboard-box-legend.component.css']
})
export class DashboardBoxLegendComponent implements OnInit {

  @Input() public boxes={};

  public icons = {
    'in': 'trending_up',
    'out': 'trending_down',
    'out_error': 'error_outline',
  }

  constructor() { }

  ngOnInit() {
    this.calcdataVal();
  }

// Pie
public pieChartOptions: ChartOptions = {
  responsive: false,
};
public pieChartColors = [
  {
    backgroundColor: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)'],
  },
];

// events
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public calcdataVal(): void{
  let total = 0;
    
    for(let key in this.boxes){
      total+=this.boxes[key][1];
    }
    for(let key in this.boxes){
      this.boxes[key] = [total - this.boxes[key][1], this.boxes[key][1]]
    }
}






}
