import { Observable } from 'rxjs';

enum UrlsModeEnum {
    deve,
    test,
    prod,
  }

export class UrlsModel{
    private url = {
        0: 'http://localhost:8010/',//dev
        1: '',//test
        2: '',//prod
    };
    // deve mode
    private mode:UrlsModeEnum = UrlsModeEnum.deve;

    public getUrl():string{
        return this.url[this.mode];
    }
}