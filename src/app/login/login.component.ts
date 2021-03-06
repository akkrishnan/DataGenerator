import { Component, OnInit, NgZone, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Routes, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
// import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Observable } from 'rxjs';
import { take, startWith, map } from 'rxjs/operators';
// import { CustomValidatorsService } from './custom-validators.service';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    LoginService
  ]
})
export class LoginComponent implements OnInit {

  title = 'Login Screen';
  loginTitle = 'Infinite Data Management Platform';

  loginErrorFlag = false;

  post: any = '';

  // userName = '';

  loginFormGroup: FormGroup;

  loginErrMessage = 'Please enter the username';
  pwdErrMessage = 'Please enter the password';

  loginpwdErrMessage = 'Technical difficulties! Please try again!';

  ngOnInit() {
    this.createLoginForm();


  }

  constructor(
    private service: LoginService,
    private router: Router
  ) { }


  createLoginForm() {
    this.loginFormGroup = new FormGroup({
      loginText: new FormControl('', [Validators.required]),
      passwordText: new FormControl('', [Validators.required])
    });
  }

  validateTextField(param: string) {
    return this.loginFormGroup.get(param).hasError('required');
  }

  validateUsername() {
    const errorFlag = this.validateTextField('loginText') || false;
    // this.loginErrorFlag = errorFlag;
    return errorFlag ? this.loginErrMessage : '';
  }

  validatePass() {
    const errorFlag = this.validateTextField('passwordText') || false;
    // this.loginErrorFlag = errorFlag;
    return errorFlag ? this.pwdErrMessage : '';
  }

  onSubmit() {

    // this.userName = this.loginFormGroup.get('loginText').value;

    this.post = {
      userName: this.loginFormGroup.get('loginText').value,
      password: btoa(this.loginFormGroup.get('passwordText').value),
      language: 'en'
    };

    if (!this.validateLoginFields()) {
      this.service.postUserContext(this.post).then(res => {
        console.log('Logged in...');
        if (res.success === true) {
          // tslint:disable-next-line: no-inferrable-types
          let navUrl: string = '/home';
          if (res.userDetails.roleId === 2) {
            navUrl = '/datagen';
          }
          this.router.navigate([navUrl]);

        } else {
          console.log(res.message);
          this.loginpwdErrMessage = res.message;
          this.loginErrorFlag = true;
        }
        /* this.service.getUserById(this.loginFormGroup.get('loginText').value).then(getRes => {
        }).catch(e => {
          console.log(e);
        }); */
      }).catch(e => {
        console.log(e);
      });
    }

    /* this.service.postUserContext(this.post).then(res => {
      console.log('Logged in successfully...');
      console.log(res);
      if (!this.validateLoginFields()) {
        this.router.navigate(['/home']);
      }
    }); */

  }

  validateLoginFields() {
    return (this.validateTextField('loginText') || this.validateTextField('passwordText'));
  }

  hideErrorMessage() {
    this.loginErrorFlag = false;
  }

  /* validateErrorMessage() {
    this.loginErrorFlag = (this.validateTextField('loginText') || this.validateTextField('passwordText'));
  } */

}
