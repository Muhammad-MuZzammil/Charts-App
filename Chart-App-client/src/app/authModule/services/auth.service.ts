import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import {API_BASE_URL} from '../../url_path';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  // public headers = new Headers({ 'Content-Type': 'application/json' });
  getTokerfromLS = localStorage.getItem("Token");
  public headers = new Headers({ 'Authorization': 'Bearer ' + this.getTokerfromLS });
  options = new RequestOptions({
    headers: this.headers,
  })

  // ?authorization='+this.getTokerfromLS

  constructor(private http: Http) { }


  postLoginFormData(obj): Promise<any> {

    return this.http.post(API_BASE_URL + '/auth/login', obj)
      .toPromise()
      .then(res => {
        return res
      })
      .catch(this.handleError)


  }

  postRegisterFormData(obj): Promise<any> {

    return this.http.post(API_BASE_URL + '/auth/register', obj, this.options)
      .toPromise()
      .then(res => {
        return res
      })
      .catch(this.handleError)
  }

  public handleError(error: any) {
    console.error('An error occurred', error);
    error['error'] = true;
    throw error;
  }
}
