import { Injectable } from '@angular/core';
import { UrlsModel } from './models/urlsModel'; 
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { Router } from '@angular/router';
import { NavBarService } from './nav-bar-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlModel: UrlsModel = new UrlsModel();
  private _registerUrl:string = this.urlModel.getUrl()+'Register';
  private _loginUrl:string = this.urlModel.getUrl()+'Login';
  private user:User;
  constructor(
    private http: HttpClient,
    private router: Router,
    private nav: NavBarService
    ) { }

  public register(user:User){
    return this.http.post<any>(this._registerUrl, user);
  }

  public login(user:User){
    return this.http.post<any>(this._loginUrl, user);
  }

  public setUser(user:User){
    this.user = user;
  }

  public logout(){
    this.user = null;
    this.nav.openedSide = false;
    this.router.navigate(['/login']);
  }

  public checkLoged(){
    if(!this.user || this.user.id == 0){
      this.router.navigate(['/login']);
    }
  }

  public getUser(){
    return this.user;
  }

}
