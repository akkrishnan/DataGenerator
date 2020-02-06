import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  private url = './api/userContext';

  private getUserByIdUrl = './api/getUserById/';

  getUserById(param: string): Promise<any> {
    const url = `${this.getUserByIdUrl}` + param;
    return this.http.get(url)
      .toPromise()
      .catch(this.handleError);
  }


  postUserContext(postData: object): Promise<any> {
    const url = `${this.url}`;
    return this.http.post(url, postData)
      .toPromise()
      .catch(this.handleError);
  }

  // handler for error in URL
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}

