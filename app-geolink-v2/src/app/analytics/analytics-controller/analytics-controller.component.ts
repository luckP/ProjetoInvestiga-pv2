import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NavBarService } from 'src/app/nav-bar-service.service';
import { AuthService } from 'src/app/auth.service';
import { AnalyticsService } from '../analytics.service';
import { AnalyticsModel } from 'src/app/models/analytics';


import {HttpClient} from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-analytics-controller',
  templateUrl: './analytics-controller.component.html',
  styleUrls: ['./analytics-controller.component.css']
})
export class AnalyticsControllerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'delete'];
  dataSource: MatTableDataSource<AnalyticsModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public nav: NavBarService,
    public auth: AuthService,
    public analyticsService: AnalyticsService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.analyticsService.analyticsList);
  }

  ngOnInit() {
    this.auth.checkLoged();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateName(name:string, id:number){
    
  }
}