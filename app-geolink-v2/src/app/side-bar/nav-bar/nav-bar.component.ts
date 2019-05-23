import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/analytics/analytics.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    public analytics: AnalyticsService,
  ) { }

  ngOnInit() {
  }

}
