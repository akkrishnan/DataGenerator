import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class DatageneratorService {

  constructor(
    private http: HttpClient
  ) { }
  private postURL = './api/savedatarequest';
  private userIdUrl = './api/getUserID';
  private generateServiceUrl = './api/generatedatarequest';

  getUserID(): Promise<any> {
    const url = `${this.userIdUrl}`;
    return this.http.get(url)
      .toPromise()
      .catch(this.handleError);
  }

  postDataRequest(postData: object): Promise<any> {
    const url = `${this.postURL}`;
    return this.http.post(url, postData)
      .toPromise()
      .catch(this.handleError);
  }

  generateDataRequest(postData: object): Promise<any> {
    const url = `${this.generateServiceUrl}`;
    return this.http.post(url, postData)
      .toPromise()
      .catch(this.handleError);
  }

  // handler for error in URL
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
