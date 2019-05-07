import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DashboardService } from '../../../dashboard.service';
declare var $: any;

@Component({
  selector: 'app-line-bar-chart-inputs',
  templateUrl: './line-bar-chart-inputs.component.html',
  styleUrls: ['./line-bar-chart-inputs.component.css']
})

export class LineBarChartInputsComponent implements OnInit {

  @Input() public inputData:any;

  public id_square:number;
  public datepicker: string;
  public loading:boolean = false;

  public data = {
    datasets:'',
    labels:'',
    options:'',
    legend:'',
    chartType:'',
    colors:'',
    chartTypes: [],
  };

  public listChartType = [];

  // remover
  ngOnChanges(changes: SimpleChanges){
    this.data = changes.inputData.currentValue;
    this.listChartType = this.data.chartTypes;

    // console.log(changes.inputData.currentValue);
    console.log(this.data.datasets);
    
  }
  constructor(private _dashboardService: DashboardService) { }

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

  public onChange(event:any){
    console.log(event);
    
    // this.loading = true;
    // this._dashboardService.loadAllEventsData()
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //       this.inputData = res;
    //       this.loading = false;
    //     },
    //     err => {
    //       console.log(err);
    //       this.loading = false;
    //     }
    //   ) 
  }
  
}
