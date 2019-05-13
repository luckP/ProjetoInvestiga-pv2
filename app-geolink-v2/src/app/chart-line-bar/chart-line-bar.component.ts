import { Component, OnInit, ViewChild , Input} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ChartModel } from '../models/chart-model';

@Component({
  selector: 'app-chart-line-bar',
  templateUrl: './chart-line-bar.component.html',
  styleUrls: ['./chart-line-bar.component.css']
})
export class ChartLineBarComponent implements OnInit {

  @Input() cahrt: ChartModel;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

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
