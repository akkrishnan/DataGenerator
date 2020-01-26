import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventEmitterService } from '../event-emitter.service';
import { ActivatedRoute, Router, Routes, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, FormGroupDirective, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {
  ErrorStateMatcher,
  MatPaginator,
  MatSort,
  MatSnackBar,
  MatTableDataSource
} from '@angular/material';
import { DataSource } from '@angular/cdk/table';
// import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Observable } from 'rxjs';
import { take, startWith, map } from 'rxjs/operators';
// import { CustomValidatorsService } from './custom-validators.service';
import { DatageneratorService } from './datagenerator.service';

export interface JsonFormat {
  name: string;
  id: string;
}

export interface JSONObject {
  key: string;
  value: string;
}

@Component({
  selector: 'app-datagenerator',
  templateUrl: './datagenerator.component.html',
  styleUrls: ['./datagenerator.component.scss'],
  providers: [
    DatageneratorService
  ]
})
export class DatageneratorComponent implements OnInit {

  formGroup: FormGroup;
  post: any = '';
  durationInSeconds = 5;
  isSubmitted = false;
  isFormInValid = true;
  successMessage = 'Successfully submitted the request form';
  actionMessage = 'Success!';

  tooltip: JSONObject[] = [
    { key: 'Generate', value: 'Request to generate the data' },
    { key: 'Reset', value: 'Reset and discard the changes' }
  ];

  error: JSONObject[] = [
    { key: 'FileName', value: 'Enter file name without spaces. For eg., "NEWFILENAME01"' },
    { key: 'Destination', value: 'Enter Destination, you can provide your desktop location' },
    { key: 'NoOfCols', value: 'Enter a number' },
    { key: 'NoOfRows', value: 'Enter a number' },
    { key: 'ColDelimeter', value: 'Enter column delimeter' },
    { key: 'AttributeName', value: 'Enter attribute name' },
    // { key: 'dataName', value: 'Enter data name' },
    { key: 'DataType', value: 'Enter data type' },
    { key: 'DataPattern', value: 'Enter data pattern' },
    { key: 'StartingFrom', value: 'Enter a number' },
    { key: 'EndingTo', value: 'Enter a number' },
    { key: 'StartingLength', value: 'Enter a number' },
    { key: 'EndingLength', value: 'Enter a number' },
    { key: 'FixedLength', value: 'Enter a number' },
    { key: 'CharactersFor', value: 'Enter some characters' }
  ];

  hint: JSONObject[] = [
    { key: 'FileName', value: 'Enter any file name. For eg., "NEWFILENAME01"' },
    { key: 'Destination', value: 'Provide any location. For eg., "C:/Users/Public/Desktop/"' },
    { key: 'NoOfCols', value: 'Enter number of columns' },
    { key: 'NoOfRows', value: 'Enter number of rows' },
    { key: 'ColDelimeter', value: 'For eg. Comma (,) can be entered' }
  ];

  projectNameList: JsonFormat[] = [
    { name: 'System of Insights', id: 'soi' },
    { name: 'Project1', id: 'project1' },
    { name: 'Project2', id: 'project2' }
  ];

  dataRequestList: JsonFormat[] = [
    { name: 'Network Billing', id: 'billing' },
    { name: 'Network Support', id: 'support' }
  ];

  /* dataTypeList: JsonFormat[] = [
    { name: 'New data set', id: 'newData' },
    { name: 'Existing data backup', id: 'existingData' },
    { name: 'Data with masking', id: 'maskData' },
    { name: 'Data with encrypted', id: 'encryptedData' }
  ]; */

  dataTypeList: JsonFormat[] = [
    { name: 'ALPHABETIC', id: 'ALPHABETIC' },
    { name: 'EMAILID', id: 'EMAILID' },
    { name: 'DATETIMENOW', id: 'DATETIMENOW' },
    { name: 'GENDER', id: 'GENDER' }
  ];

  dataPatternListAlphabetic: JsonFormat[] = [
    { name: 'RANDOM', id: 'RANDOM' },
    { name: 'RANDOM-FIX-LEN', id: 'RANDOM-FIX-LEN' }
  ];

  dataPatternListEmailId: JsonFormat[] = [
    { name: '_@.', id: '_@.' },
    { name: '.@.', id: '.@.' }
  ];

  dataPatternListDateTimeNow: JsonFormat[] = [
    { name: 'IST', id: 'IST' },
    { name: 'EST', id: 'EST' },
    { name: 'PST', id: 'PST' },
    { name: 'GMT', id: 'GMT' },
    { name: 'MM-DD-YYYY HH:MM', id: 'MM-DD-YYYY HH:MM' },
    { name: 'MM-DD-YYYY HH:MM:SS', id: 'MM-DD-YYYY HH:MM:SS' }
  ];

  dataPatternListGender: JsonFormat[] = [
    { name: 'MALE', id: 'MALE' },
    { name: 'FEMALE', id: 'FEMALE' },
    { name: 'MALE/FEMALE', id: 'MALE/FEMALE' }
  ];

  dataFormatList: JsonFormat[] = [
    { name: 'Flat file', id: 'flat' },
    { name: 'XML', id: 'xml' },
    { name: 'JSON', id: 'json' },
    { name: 'Database', id: 'database' }
  ];

  postFormatList = {
    requestId: { value: 'Request ID', key: 'requestId' },
    FileName: { value: 'File Name', key: 'FileName' },
    Destination: { value: 'Destination', key: 'Destination' },
    NoOfCols: { value: 'No. of Columns', key: 'NoOfCols' },
    NoOfRows: { value: 'No. of Rows', key: 'NoOfRows' },
    ColDelimeter: { value: 'Column Delimeter', key: 'ColDelimeter' },
    AttributeName: { value: 'Attribute Name', key: 'AttributeName' },
    DataType: { value: 'Data Type', key: 'DataType' },
    DataPattern: { value: 'Data Pattern', key: 'DataPattern' },
    StartingFrom: { value: 'Starting From', key: 'StartingFrom' },
    EndingTo: { value: 'Ending To', key: 'EndingTo' },
    StartingLength: { value: 'Starting Length', key: 'StartingLength' },
    EndingLength: { value: 'Ending Length', key: 'EndingLength' },
    FixedLength: { value: 'Fixed Length', key: 'FixedLength' },
    CharactersFor: { value: 'Fixed Length', key: 'CharactersFor' },
    userId: { value: 'userId', key: 'userId' }
  };

  mandatoryControls = [
    'FileName',
    'Destination',
    'NoOfCols',
    'NoOfRows',
    'ColDelimeter',
    'StartingFrom',
    'EndingTo',
    'StartingLength',
    'EndingLength',
    'FixedLength'
  ];

  title = 'Data Generator';

  filterDataTypeList: Observable<JsonFormat[]>;
  filterDataPatternList: Observable<JsonFormat[]>;

  constructor(
    private service: DatageneratorService,
    private titleService: Title,
    private snackBar: MatSnackBar,
    private eventEmitterService: EventEmitterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();

    this.filterDataTypeList = this.formGroup.get('DataType').valueChanges
      .pipe(
        startWith(''),
        map(name => name ? (this.processFilterDataPattern(), this._filterDataType(name)) : this.dataTypeList.slice())
      );

    this.filterDataPatternList = this.formGroup.get('DataPattern').valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this._filterPattern(name) : this.getFilterArray().slice())
      );

    if (this.eventEmitterService.subsVar === undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeSetHomeTitle.subscribe((name: string) => {
        this.setTitle();
      });
    }
  }

  createForm() {
    this.formGroup = new FormGroup({
      FileName: new FormControl(''),
      Destination: new FormControl('C:/Users/Public/Desktop'),
      NoOfCols: new FormControl(1),
      NoOfRows: new FormControl(1),
      ColDelimeter: new FormControl(','),
      AttributeName: new FormControl(''),
      // dataName: new FormControl('', [Validators.required]),
      DataType: new FormControl(''),
      DataPattern: new FormControl(''),
      StartingFrom: new FormControl(1),
      EndingTo: new FormControl(1),
      StartingLength: new FormControl(1),
      EndingLength: new FormControl(1),
      FixedLength: new FormControl(1),
      CharactersFor: new FormControl('')
    });
    this.setDefaultValues();
  }

  processFilterDataPattern() {
    this.formGroup.get('DataPattern').setValue('');
    console.log('processFilterDataPattern ==== filterDataPatternList');
    this.filterDataPatternList = this.formGroup.get('DataPattern').valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this._filterPattern(name) : this.getFilterArray().slice())
      );
  }

  onChange(keyStr: string, param: string) {
    this.isFormInValid = false;
    const control = this.formGroup.get(keyStr);
    Object.keys(this.formGroup.controls).forEach(key => {
      for (const e of this.mandatoryControls) {
        const controlValue = this.formGroup.get(e).value;
        if (e === key) {
          if (controlValue === null || controlValue.length === 0) {
            this.isFormInValid = true;
          }
        }
      }
    });
    if ((control.value === null || (control.value.length === 0)) && !this.isSubmitted && param === 'required') {
      control.setErrors({ required: true });
    }
  }

  showSuccessMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

  setTitle() {
    this.titleService.setTitle('Data Generator');
  }

  navigateToHome(urlString: string) {
    this.router.navigate([urlString]);
  }

  private _filterDataType(value: string): JsonFormat[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.dataTypeList.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0);
    }
  }

  private _filterPattern(value: string): JsonFormat[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.getFilterArray().filter((item: any) => item.name.toLowerCase().indexOf(filterValue) === 0);
    }
  }

  private getFilterArray(): JsonFormat[] {
    let filterArr: JsonFormat[];
    const dataTypeValue = this.formGroup.get('DataType').value;
    if (dataTypeValue === 'ALPHABETIC') {
      filterArr = this.dataPatternListAlphabetic;
    } else if (dataTypeValue === 'EMAILID') {
      filterArr = this.dataPatternListEmailId;
    } else if (dataTypeValue === 'DATETIMENOW') {
      filterArr = this.dataPatternListDateTimeNow;
    } else if (dataTypeValue === 'GENDER') {
      filterArr = this.dataPatternListGender;
    } else {
      filterArr = this.dataPatternListAlphabetic;
    }
    return filterArr;
  }

  validateErrorMessage(param: string) {
    const fieldValue = this.formGroup.get(param).value;
    return fieldValue.length === 0 ? this.getObjectValue(param, this.error) : '';
  }

  getHintMessage(param: string) {
    return this.getObjectValue(param, this.hint);
  }

  getTooltipText(param: string) {
    return this.getObjectValue(param, this.tooltip);
  }

  getObjectValue(param: string, arrayObject: any) {
    for (const e of arrayObject) {
      if (e.key === param) {
        return e.value;
      }
    }
  }

  // validateFileName() {
  //   return this.validateErrorMessage('FileName');
  // }

  // validateDestination() {
  //   return this.validateErrorMessage('Destination');
  // }

  // validateNoOfCols() {
  //   return this.validateErrorMessage('NoOfCols');
  // }

  // validateNoOfRows() {
  //   return this.validateErrorMessage('NoOfRows');
  // }

  // validateDelimeter() {
  //   return this.validateErrorMessage('ColDelimeter');
  // }

  // validateAttributeName() {
  //   return this.validateErrorMessage('AttributeName');
  // }

  // validateDataName() {
  //   return this.validateErrorMessage('dataName');
  // }

  // validateDataType() {
  //   return this.validateErrorMessage('DataType');
  // }

  // validateDataPattern() {
  //   return this.validateErrorMessage('DataPattern');
  // }

  // validateStartingFrom() {
  //   return this.validateErrorMessage('StartingFrom');
  // }

  // validateEndingTo() {
  //   return this.validateErrorMessage('EndingTo');
  // }

  // validateStartingLen() {
  //   return this.validateErrorMessage('StartingLength');
  // }

  // validateEndingLen() {
  //   return this.validateErrorMessage('EndingLength');
  // }

  // validateFixedLen() {
  //   return this.validateErrorMessage('FixedLength');
  // }

  // validateCharactersFor() {
  //   return this.validateErrorMessage('CharactersFor');
  // }


  getNoOfColsHint() {
    return this.getHintMessage('NoOfCols');
  }

  getNoOfRowsHint() {
    return this.getHintMessage('NoOfRows');
  }

  getColDelimeterHint() {
    return this.getHintMessage('ColDelimeter');
  }

  onReset() {
    if (this.formGroup.valid) {
      this.formGroup.reset();
      this.setDefaultValues();
    }
    this.isFormInValid = true;
  }

  resetTextField() {
    console.log('resetTextField');
  }

  setDefaultValues() {

    // this.formGroup.markAsPristine();
    // this.formGroup.markAsUntouched();
    // this.formGroup.updateValueAndValidity();

    this.formGroup.patchValue({
      FileName: '',
      Destination: 'C:/Users/Public/Desktop',
      NoOfCols: 1,
      NoOfRows: 1,
      ColDelimeter: ',',
      AttributeName: '',
      DataType: '',
      DataPattern: '',
      StartingFrom: 1,
      EndingTo: 1,
      StartingLength: 1,
      EndingLength: 1,
      FixedLength: 1,
      CharactersFor: ''
    });
    this.formGroup.markAsUntouched();
    this.isSubmitted = false;
  }

  onSubmit(post: any) {
    if (this.formGroup.valid) {
      console.log('Form Submitted!');
      post.requestId = 0;
      this.isSubmitted = true;

      this.service.getUserID().then(res => {
        console.log('========== res ===================');
        console.log(res.userName);
        console.log('========== res ===================');
        post.userId = res.userName;
        this.post = post;
        this.service.postDataRequest(post).subscribe(postResponse => {
          console.log(postResponse);
          console.log('Form submission completed....');
          this.generateDataRequest(post);
        },
          (err: HttpErrorResponse) => {
            console.log(err);
          });
      }).catch(e => {
        console.log(e);
      });

      /* this.service.getUserID().then(res => {
        console.log('========== res ===================');
        console.log(res.userName);
        console.log('========== res ===================');
        post.userId = res.userName;
        this.post = post;
        this.service.postDataRequest(post).then(postResponse => {
          console.log(postResponse);
          console.log('Form submission completed....');
          this.generateDataRequest(post);
        }).catch(e => {
          console.log(e);
        });
      }).catch(e => {
        console.log(e);
      }); */
    }
  }

  generateDataRequest(post: any) {
    this.service.generateDataRequest(post).subscribe(res => {
      console.log('File Generated....');
      this.showSuccessMessage(this.successMessage, this.actionMessage);
      this.onReset();
    },
      (e: HttpErrorResponse) => {
        console.log(e);
      });
  }

  doReload() {
    this.navigateToHome('/datagen');
  }

}

