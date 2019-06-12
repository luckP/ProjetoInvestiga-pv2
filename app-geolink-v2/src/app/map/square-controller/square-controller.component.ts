import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { NavBarService } from 'src/app/nav-bar-service.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Square } from 'src/app/models/square';
import { MapService } from '../map.service';

@Component({
  selector: 'app-square-controller',
  templateUrl: './square-controller.component.html',
  styleUrls: ['./square-controller.component.css']
})
export class SquareControllerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'color', 'status'];

  dataSource: MatTableDataSource<Square>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private auth: AuthService,
    public nav: NavBarService,
    public mapService: MapService
  ) { 

    let colors = ['#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8'];
    this.mapService.squareList = Array.from({length: 100}, (_, k) => {return {
      id:k+1,
      name: 'square'+(k+1),
      color: colors[parseInt((Math.random()*100)+'')%colors.length],
      status: true,
    }});
    this.dataSource = new MatTableDataSource(this.mapService.squareList);

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

}
