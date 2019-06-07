import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/login/login.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AnalyticsService } from '../analytics.service';
import { AnalyticsModel } from 'src/app/models/analytics';
import { ChartModel } from 'src/app/models/chart-model';
import { AnalyticsChartModel } from 'src/app/models/analyticsChart';
declare var $:any;

@Component({
  selector: 'app-analytics-chart-add',
  templateUrl: './analytics-chart-add.component.html',
  styleUrls: ['./analytics-chart-add.component.css']
})
export class AnalyticsChartAddComponent implements OnInit {

  public squares = Array.from({length: 64}, (_, i) => i+1);

  constructor(
    private analyticsService: AnalyticsService,
    public dialogRef: MatDialogRef<AnalyticsChartAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AnalyticsModel,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  public addChart(){
    let analyticsChart:any = {
      'analytics_id': this.analyticsService.getAnalyticsSelected().id,
      'title':this.titleFormControl.value,
      'subtitle':this.subtitleTitleFormControl.value,
      'chartSize':'col-md-6',
      'lock':0,
      'chartType':'line',
      'square_id':1,
      'analytics_chart_timestamp':0,
      'position_index':0,
      'show_legends':0,
      'smart':0,
    }

   if(this.titleFormControl.value){
      this.analyticsService.addAnalyticsChart(analyticsChart)
        .subscribe(
          resp =>{ 
            console.log(resp);
            this.dialogRef.close("It was saved");
            analyticsChart['id'] = resp.id;
            this.analyticsService.pushAnalyticsChartModel(analyticsChart);
            $("#sortable").sortable('refresh');

            this.snackBar.open('Analytics add', ('success'), {
              duration: 2000,
            });
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

  subtitleTitleFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

}
