import { Injectable } from '@angular/core';
import { Square } from '../models/square';
import { UrlsModel } from '../models/urlsModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private urlModel: UrlsModel = new UrlsModel();
  public squares:any = {};
  
  public squareList: Square[];
  constructor(
    private http: HttpClient,
    ) { }

  loadSquare(data){
    let insertSquareUrl:string = this.urlModel.getUrl()+'loadAllMapsquares';
    return this.http.post<any>(insertSquareUrl, data);
  }
    
  insertSquare(data){
    let insertSquareUrl:string = this.urlModel.getUrl()+'insertSquare';
    return this.http.post<any>(insertSquareUrl, data);
  }
    
  editSquare(data){
    let editSquareUrl:string = this.urlModel.getUrl()+'editSquare';
    return this.http.post<any>(editSquareUrl, data);
  }

  deleteSquare(data){
    let deleteSquareUrl:string = this.urlModel.getUrl()+'deleteSquare';
    return this.http.post<any>(deleteSquareUrl, data);
  }

  loadAllMapsquares(){
    let loadAllMapsquaresUrl:string = this.urlModel.getUrl()+'loadAllMapsquares';
    return this.http.post<any>(loadAllMapsquaresUrl, {});
  }
}
