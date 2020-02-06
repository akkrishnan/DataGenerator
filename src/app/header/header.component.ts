import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Routes, RouterModule } from '@angular/router';
// import { EventEmitter } from 'protractor';

import { HeaderService } from './header.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    HeaderService
  ]
})
export class HeaderComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  loggedInUser: string = '';

  @Output() login = new EventEmitter<string>();

  // tslint:disable-next-line: no-inferrable-types
  title: string = 'Infinite Data Management Platform';

  // tslint:disable-next-line: no-inferrable-types
  encryptSecretKey: string = '$datagen$';

  constructor(
    private service: HeaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    /* this.service.getUserContext().then(res => {
      // console.log(this.decryptData(res.userDetails.userName));
      console.log(res);
      console.log('loggedInUser');
      this.loggedInUser = this.decryptData(res.userDetails.userName);
    }); */
    this.service.getUserContext().then(res => {
      // console.log(this.decryptData(res.userDetails.userName));
      this.loggedInUser = this.decryptData(res.userDetails.userName);
      this.login.emit(this.loggedInUser);
    }).catch(e => {
      console.log(e);
      this.loggedInUser = '';
      // this.doLogout();
    });
  }

  decryptData(data: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return bytes.toString(CryptoJS.enc.Utf8);
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  navigateToHome(urlString: string) {
    this.router.navigate([urlString]);
  }

  doLogout() {
    this.navigateToHome('/login');
  }

}
