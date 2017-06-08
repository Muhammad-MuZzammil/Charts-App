import {Injectable} from '@angular/core'
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import {API_BASE_URL} from '../../url_path';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChartService {
    public headers = new Headers({ 'Content-Type': 'application/json' });
    getTokerfromLS = localStorage.getItem("Token");
    //   public headers = new Headers({ 'Authorization': 'Bearer ' + this.getTokerfromLS });
    //   options = new RequestOptions({
    //     headers: this.headers,
    //   })
    // ?authorization='+this.getTokerfromLS
    constructor(private http: Http) {

    }

    getAllValuesOfChart(): Promise<any> {
        // console.log(API_BASE_URL);

        return this.http.get(API_BASE_URL + '/charts/getChartValues?authorization=' + this.getTokerfromLS,
            this.headers)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError)
    }

    create(obj): Promise<any> {
        return this.http.post(API_BASE_URL + '/charts/postChartData?authorization=' + this.getTokerfromLS,
            obj, this.headers)
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(this.handleError)
    }
    createMultipleCharts(obj): Promise<any> {
        return this.http.post(API_BASE_URL + '/charts/postMultipleChartData?authorization=' + this.getTokerfromLS,
            obj, this.headers)
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(this.handleError)
    }

    shareRequest(id): Promise<any> {

        return this.http.get(API_BASE_URL + '/charts/share/' + id + '?authorization=' + this.getTokerfromLS, this.headers)
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(this.handleError)
    }

    public handleError(error: any) {
        console.error('An error occurred', error)
        return error
    }

}
