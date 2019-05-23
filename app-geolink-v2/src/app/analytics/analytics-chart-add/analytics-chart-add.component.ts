import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/login/login.component';
import { MatDialogRef } from '@angular/material';
import { AnalyticsService } from '../analytics.service';
import { AnalyticsChartModel } from 'src/app/models/analyticsChart';

@Component({
  selector: 'app-analytics-chart-add',
  templateUrl: './analytics-chart-add.component.html',
  styleUrls: ['./analytics-chart-add.component.css']
})
export class AnalyticsChartAddComponent implements OnInit {

  public foods = [1,2,3,4];

  constructor(
    private analyticsService: AnalyticsService,
    public dialogRef: MatDialogRef<AnalyticsChartAddComponent>,
  ) { }

  ngOnInit() {
  }

  public addChart(){
    let analyticsChart:AnalyticsChartModel = {
      id:0,
      analytics_id:1,
      title:this.titleFormControl.value,
      description:this.descriptionFormControl.value,
      analytics_chart_timestamp:0,
      square_id:0,
      edit_mode:0,
      position_index:0,
      size:0,
      type:0,
      show_legends:0,
      smart:0,
    }

   if(this.titleFormControl.value){
      this.analyticsService.addAnalyticsChart(analyticsChart)
        .subscribe(
          resp =>{ 
            console.log(resp);
            this.dialogRef.close("It was saved");
          },
          err=>{
            console.error(err);
          }
        );
    }
  }

  titleFormControl = new FormControl('', [
    Validators.required,
  ]);

  descriptionFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

}
