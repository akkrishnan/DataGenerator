import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeaderService {

  constructor(
    private http: HttpClient
  ) { }
  private url = './api/getUserContext';

  getUserContext(): Promise<any> {
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
