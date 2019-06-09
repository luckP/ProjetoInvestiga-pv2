import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AnalyticsAddComponent } from '../analytics-add/analytics-add.component';
import { AnalyticsService } from '../analytics.service';
declare var $:any;

@Component({
  selector: 'app-analytics-chart-delete',
  templateUrl: './analytics-chart-delete.component.html',
  styleUrls: ['./analytics-chart-delete.component.css']
})
export class AnalyticsChartDeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private analyticsService: AnalyticsService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AnalyticsChartDeleteComponent>,
  ) { }

  public deleteChart(){
    console.log(this.data);
    
    this.analyticsService.deleteChart(this.data.id)
      .subscribe(
        resp=>{
          $('#'+this.data.id).hide();
          this.dialogRef.close("It was saved");
          this.snackBar.open('Delete', ('Success'), {
            duration: 2000,
          });
        },
        err=>{
          console.error('onClickDelete');
          
        }
      );
  }



}
