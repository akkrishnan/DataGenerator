import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { timeoutWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of, TimeoutError } from 'rxjs';

@Injectable()
export class DatageneratorService {

  constructor(
    private http: HttpClient
  ) { }
  httpSubscription: Subscription;
  private postURL = './api/savedatarequest';
  private userIdUrl = './api/getUserID';
  private generateServiceUrl = './api/generatedatarequest';

  requestTimeout = 1000;

  getUserID(): Promise<any> {
    const url = `${this.userIdUrl}`;
    return this.http.get(url)
      .toPromise()
      .catch(this.handleError);

    /* return this.http.get(url)
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
      ); */
  }

  postDataRequest(postData: object): Observable<any> {
    const url = `${this.postURL}`;
    /* return this.http.post(url, postData)
      .toPromise()
      .catch(this.handleError); */
    return this.http.post(url, { postData })
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
  }

  generateDataRequest(postData: object): Observable<any> {
    const url = `${this.generateServiceUrl}`;
    return this.http.post(url, { postData })
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
    // .toPromise()
    // .catch(this.handleError);
  }

  // handler for error in URL
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
