import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DataService {

  private static serverAddress:string = 'http://172.18.2.34:8385/pa/v0/';
  public static apyKey:string = '';

  constructor( private http: Http) {}

  private createOptions() : RequestOptions {
    var headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('api_key', DataService.apyKey);
    return new RequestOptions({headers:headers});
  }

  public login(data:{phone:string, password:string}) {
    var body = JSON.stringify({data:data});
    return this.http.post(DataService.serverAddress + 'login', body, this.createOptions()).map((res: Response) => res.json());
  }

  public logout() {
    console.log(this.createOptions());
    var body = JSON.stringify({data:{}});
    return this.http.post(DataService.serverAddress + 'logout', body, this.createOptions()).map((res: Response) => res.json());
  }

  public registration(data:{phone:string, email:string, user_name:string, password:string}) {
    var body = JSON.stringify({data:data});
    return this.http.post(DataService.serverAddress + 'registration', body, this.createOptions()).map((res: Response) => res.json());
  }



  /*public updateFood(food) : Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(food);
    return this.http.put('/api/food/' + food_id, body, options ).map((res: Response) => res.json());
  }

  public deleteFood(food_id) : Observable<Response>
    return this.http.delete('/api/food/' + food_id);
  }*/
}
