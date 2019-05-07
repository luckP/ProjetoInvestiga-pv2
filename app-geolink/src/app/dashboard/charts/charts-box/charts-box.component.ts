import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-charts-box',
  templateUrl: './charts-box.component.html',
  styleUrls: ['./charts-box.component.css']
})
export class ChartsBoxComponent implements OnInit {

  @Input() inputData: any;
  public data: any;
  classCard: string = "mt-4 col-sm-1 col-md-1";
  public options = {
      tooltips: {
        enabled: false
    }
};

  ngOnChanges(changes: SimpleChanges){
    this.inputData = changes.inputData;
    this.data = this.inputData.currentValue;
    let length: number = 12 / this.data.chartCards.length;
    this.classCard = "mt-4 col-sm-4 col-md-" + length;
  }


  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }
}

