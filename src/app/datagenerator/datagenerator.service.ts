import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class DatageneratorService {

  constructor(
    private http: HttpClient
  ) { }
  private url = './api/savedatarequest';
  private generateServiceUrl = './api/generatedatarequest';

  postDataRequest(postData: object): Promise<any> {
    const url = `${this.url}`;
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
