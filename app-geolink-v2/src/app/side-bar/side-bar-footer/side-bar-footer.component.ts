import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-side-bar-footer',
  templateUrl: './side-bar-footer.component.html',
  styleUrls: ['./side-bar-footer.component.css']
})
export class SideBarFooterComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  public logout(){
    this.auth.logout();
  }

}
