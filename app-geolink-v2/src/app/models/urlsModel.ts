enum UrlsMode {
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
    private mode:UrlsMode = UrlsMode.deve;

    public getUrl():string{
        return this.url[this.mode];
    }
}