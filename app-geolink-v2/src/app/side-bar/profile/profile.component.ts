import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User;
  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit() {
    this.user = this.auth.getUser();
  }

}
