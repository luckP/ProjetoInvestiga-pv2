import { Component, OnInit } from '@angular/core';
import { AnalyticsModel } from 'src/app/models/analytics';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AnalyticsService } from '../analytics.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-analytics-add',
  templateUrl: './analytics-add.component.html',
  styleUrls: ['./analytics-add.component.css']
})

export class AnalyticsAddComponent implements OnInit {

  constructor(
    private analyticsService: AnalyticsService,
    public dialogRef: MatDialogRef<AnalyticsAddComponent>,
    private auth: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  public add(){
    let analytics:AnalyticsModel = {
      id: 0,
      id_user: this.auth.getUser().id,
      name: this.nameFormControl.value,
    }

   if(this.nameFormControl.value){
      this.analyticsService.addAnalytics(analytics)
        .subscribe(
          resp =>{ 
            console.log(resp);
            this.dialogRef.close("It was saved");
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

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

}
