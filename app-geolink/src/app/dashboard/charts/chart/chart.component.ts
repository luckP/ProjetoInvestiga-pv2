import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() public inputData:any;

  public data = {
    datasets:'',
    labels:'',
    options:'',
    legend:'',
    chartType:'',
    colors:'',
    chartTypes: [],
  };

  public listChartType;

  ngOnChanges(changes: SimpleChanges){
    this.data = changes.inputData.currentValue;
    this.listChartType = this.data.chartTypes;

    // console.log(changes.inputData.currentValue);
    console.log(this.data.datasets);
    
  }
  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
    console.log('teste');
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
