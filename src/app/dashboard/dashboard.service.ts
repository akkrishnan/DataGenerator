import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { timeoutWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of, TimeoutError } from 'rxjs';

@Injectable()
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  private url = './api/getTopRequests';
  // private url = '../../data/toprequests.json';

  requestTimeout = 1000;

  getList(): Observable<any> {
    const url = `${this.url}`;
    return this.http.get(url)
      .pipe(
        timeout(this.requestTimeout),
        map(res => {
          return res;
        }),
        catchError(err => {
          console.log(err);
          if (err.name === 'TimeoutError') {
            console.log('data');
          }
          return Observable;
        })
      );
    /* return this.http.get(url)
      .toPromise()
      .catch(this.handleError); */
  }
  // handler for error in URL
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
