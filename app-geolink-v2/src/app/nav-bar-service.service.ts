import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsModel } from './models/urlsModel';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private urlModel: UrlsModel = new UrlsModel();
  public openedSide:boolean = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  public openCloseSideBar(){
    this.openedSide = !this.openedSide;
  }

  public loadNavBarList(url){
    return this.http.post<any>(this.urlModel.getUrl()+url, this.auth.getUser());
  }



}
