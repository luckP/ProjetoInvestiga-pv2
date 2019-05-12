import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public checkLoad: boolean = false;

  constructor() { }

  turnOfLaod(){
    if(this.checkLoad){
      let time = 2000;
      setTimeout(()=>{
        this.checkLoad = false;
      }, time);
    }
    
  }
}
