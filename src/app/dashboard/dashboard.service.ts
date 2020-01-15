import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  private url = './api/getTopRequests';

  getList(): Promise<any> {
    const url = `${this.url}`;
    return this.http.get(url)
      .toPromise()
      .catch(this.handleError);
  }
  // handler for error in URL
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
