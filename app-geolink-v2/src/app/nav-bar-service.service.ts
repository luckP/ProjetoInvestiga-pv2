import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  public openedSide:boolean = false;

  constructor() { }

  public openCloseSideBar(){
    this.openedSide = !this.openedSide;
  }
}
