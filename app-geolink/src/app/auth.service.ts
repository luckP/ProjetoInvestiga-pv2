import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl:string = 'http://localhost:8010/Register';
  private _loginUrl:string = 'http://localhost:8010/Login';
  constructor(private http: HttpClient) { }

  registerUser( user ){
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser( user ){
    return this.http.post<any>(this._loginUrl, user);
  }
}
