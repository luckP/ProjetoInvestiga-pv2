import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public user: User={
    id: 1,
    name: 'Lucas',
    email: 'lucas.adarap@hotmail.com',
    password: '123',
    status: 1,

  }
  constructor() { }

  ngOnInit() {
  }

}
