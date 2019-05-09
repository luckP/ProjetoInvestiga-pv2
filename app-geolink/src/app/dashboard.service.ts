import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _loadAllEventsData:string = 'http://localhost:8010/LoadAllEventsData';
  constructor(private http: HttpClient) { }

  public loadAllEventsData(){
    return this.http.post<any>(this._loadAllEventsData, '');
  }
<<<<<<< HEAD

  public selectDataByIdSquareDate(){
    return this.http.post<any>(this._loadAllEventsData, '');
  }
=======
>>>>>>> 35aad6439ad51dfefe2a473dfb2c05a54218594b
}







// private _registerUrl:string = 'http://localhost:8010/Register';
//   private _loginUrl:string = 'http://localhost:8010/Login';
//   constructor(private http: HttpClient) { }

//   registerUser( user ){
//     return this.http.post<any>(this._registerUrl, user);
//   }

//   loginUser( user ){
//     return this.http.post<any>(this._loginUrl, user);
//   }