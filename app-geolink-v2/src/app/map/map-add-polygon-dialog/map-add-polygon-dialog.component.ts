import {Component, Input, Inject} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { MapService } from '../map.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-map-add-polygon-dialog',
  templateUrl: './map-add-polygon-dialog.component.html',
  styleUrls: ['./map-add-polygon-dialog.component.css']
})

export class MapAddPolygonDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MapAddPolygonDialogComponent>,
    private mapService: MapService,
    private snackBar: MatSnackBar,
  ) { }

  onClickSave(){
    this.data['status'] = 0;
    this.data.name = this.nameFormControl.value;
    this.data.color = this.colorFormControl.value;

    this.mapService.insertSquare(this.data)
      .subscribe(
        resp => {
          this.snackBar.open('Square save', (''), {
            duration: 2000,
          });
          this.dialogRef.close(resp);
        },
        err  => {
          this.snackBar.open('Fail to connect to server', ('=('), {
            duration: 2000,
          });
        }
      )
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  colorFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
}
