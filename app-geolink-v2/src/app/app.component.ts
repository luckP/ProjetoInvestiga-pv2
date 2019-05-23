import { Component } from '@angular/core';
import { NavBarService } from './nav-bar-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public nav: NavBarService){}
}
