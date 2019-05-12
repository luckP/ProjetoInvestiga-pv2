import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {


  @Input() public inputData:any;
  public line = {

    datasets: {},
    labels: {},
    options: {},
    colors: {},
    legend: {},
    chartType: {},
  };

  ngOnChanges(changes: SimpleChanges){
    this.line = changes.inputData.currentValue.line;
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
