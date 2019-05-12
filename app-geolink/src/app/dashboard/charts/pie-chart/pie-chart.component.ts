import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() inputData:any;
  public data = {
    datasets:'',
    labels:'',
    options:'',
    legend:'',
    chartType:'',
    colors:'',
    chartTypes: [],
  };

  ngOnChanges(changes: SimpleChanges){
    this.data = changes.inputData.currentValue;
  }

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
