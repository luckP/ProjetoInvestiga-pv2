import { Injectable } from '@angular/core';
import { UrlsModel } from './models/UrlsModel'; 
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlModel: UrlsModel = new UrlsModel();
  private _registerUrl:string = this.urlModel.getUrl()+'Register';
  constructor(private http: HttpClient) { }

  public register(user:User){
    return this.http.post<any>(this._registerUrl, user);
  }
}
