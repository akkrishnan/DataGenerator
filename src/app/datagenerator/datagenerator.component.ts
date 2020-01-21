import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventEmitterService } from '../event-emitter.service';
import { ActivatedRoute, Router, Routes, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, FormGroupDirective, FormControl, Validators, ValidatorFn } from '@angular/forms';
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

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomerErrorStateMatched implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: NgForm | FormGroupDirective | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.touched || control.dirty || isSubmitted));
  }
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
  successMessage = 'Successfully submitted the request form';
  actionMessage = 'Success!';

  error: JSONObject[] = [
    { key: 'fileName', value: 'Enter file name without spaces. For eg., "NEWFILENAME01"' },
    { key: 'destination', value: 'Enter destination, you can provide your desktop location' },
    { key: 'noOfCols', value: 'Enter a number' },
    { key: 'noOfRows', value: 'Enter a number' },
    { key: 'colDelimeter', value: 'Enter column delimeter' },
    { key: 'attributeName', value: 'Enter attribute name' },
    // { key: 'dataName', value: 'Enter data name' },
    { key: 'dataType', value: 'Enter data type' },
    { key: 'dataPattern', value: 'Enter data pattern' },
    { key: 'startingFrom', value: 'Enter a number' },
    { key: 'endingTo', value: 'Enter a number' },
    { key: 'startingLength', value: 'Enter a number' },
    { key: 'endingLength', value: 'Enter a number' },
    { key: 'fixedLength', value: 'Enter a number' },
    { key: 'charactersFor', value: 'Enter some characters' }
  ];

  hint: JSONObject[] = [
    { key: 'fileName', value: 'Enter any file name. For eg., "NEWFILENAME01"' },
    { key: 'destination', value: 'Provide your desktop location' },
    { key: 'noOfCols', value: 'Enter number of columns' },
    { key: 'noOfRows', value: 'Enter number of rows' },
    { key: 'colDelimeter', value: 'For eg. Comma (,) can be entered' }
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
    fileName: { value: 'File Name', key: 'fileName' },
    destination: { value: 'Destination', key: 'destination' },
    noOfCols: { value: 'No. of Columns', key: 'noOfCols' },
    noOfRows: { value: 'No. of Rows', key: 'noOfRows' },
    colDelimeter: { value: 'Column Delimeter', key: 'colDelimeter' },
    attributeName: { value: 'Attribute Name', key: 'attributeName' },
    dataType: { value: 'Data Type', key: 'dataType' },
    dataPattern: { value: 'Data Pattern', key: 'dataPattern' },
    startingFrom: { value: 'Starting From', key: 'startingFrom' },
    endingTo: { value: 'Ending To', key: 'endingTo' },
    startingLength: { value: 'Starting Length', key: 'startingLength' },
    endingLength: { value: 'Ending Length', key: 'endingLength' },
    fixedLength: { value: 'Fixed Length', key: 'fixedLength' },
    charactersFor: { value: 'Fixed Length', key: 'charactersFor' },
    userId: { value: 'userId', key: 'userId' }
  };

  title = 'Data Generator';

  filterDataTypeList: Observable<JsonFormat[]>;
  filterDataPatternList: Observable<JsonFormat[]>;


  // create instance of custom ErrorStateMatcher
  errorMatcher = new CustomerErrorStateMatched();

  constructor(
    private service: DatageneratorService,
    private titleService: Title,
    private snackBar: MatSnackBar,
    private eventEmitterService: EventEmitterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate();

    this.filterDataTypeList = this.formGroup.get('dataType').valueChanges
      .pipe(
        startWith(''),
        map(name => name ? (this.processFilterDataPattern(), this._filterDataType(name)) : this.dataTypeList.slice())
      );

    this.filterDataPatternList = this.formGroup.get('dataPattern').valueChanges
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

  processFilterDataPattern() {
    console.log('processFilterDataPattern=== == filterDataPatternList');
    this.filterDataPatternList = this.formGroup.get('dataPattern').valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this._filterPattern(name) : this.getFilterArray().slice())
      );
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

  createForm() {
    this.formGroup = new FormGroup({
      fileName: new FormControl('', [Validators.required]),
      destination: new FormControl(''),
      noOfCols: new FormControl(''),
      noOfRows: new FormControl(''),
      colDelimeter: new FormControl(''),
      attributeName: new FormControl(''),
      // dataName: new FormControl('', [Validators.required]),
      dataType: new FormControl(''),
      dataPattern: new FormControl(''),
      startingFrom: new FormControl(''),
      endingTo: new FormControl(''),
      startingLength: new FormControl(''),
      endingLength: new FormControl(''),
      fixedLength: new FormControl(''),
      charactersFor: new FormControl('')
    });



    /* this.formGroup.setValue({
      fileName: '',
      destination: 'C:/Users/Public/Desktop',
      noOfCols: '1',
      noOfRows: '1',
      colDelimeter: ',',
      attributeName: '',
      dataType: '',
      dataPattern: '',
      startingFrom: '1',
      endingTo: '1',
      startingLength: '1',
      endingLength: '1',
      fixedLength: '1',
      charactersFor: ''
    }); */

    this.formGroup.patchValue({
      destination: 'C:/Users/Public/Desktop',
      noOfCols: '1',
      noOfRows: '1',
      colDelimeter: ',',
      startingFrom: '1',
      endingTo: '1',
      startingLength: '1',
      endingLength: '1',
      fixedLength: '1'
    });
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
    const dataTypeValue = this.formGroup.get('dataType').value;
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

  setChangeValidate() {
  }

  returnMessage(param: string, infoMode: boolean) {
    if (infoMode === false) {
      for (const e of this.error) {
        if (e.key === param) {
          return e.value;
        }
      }
    } else {
      for (const e of this.hint) {
        if (e.key === param) {
          return e.value;
        }
      }
    }
  }

  validateErrorMessage(param: string) {
    const fieldValue = this.formGroup.get(param).value;
    return fieldValue.length === 0 ? this.returnMessage(param, false) : '';
  }

  getHintMessage(param: string) {
    return this.returnMessage(param, true);
  }

  // validateFileName() {
  //   return this.validateErrorMessage('fileName');
  // }

  // validateDestination() {
  //   return this.validateErrorMessage('destination');
  // }

  // validateNoOfCols() {
  //   return this.validateErrorMessage('noOfCols');
  // }

  // validateNoOfRows() {
  //   return this.validateErrorMessage('noOfRows');
  // }

  // validateDelimeter() {
  //   return this.validateErrorMessage('colDelimeter');
  // }

  // validateAttributeName() {
  //   return this.validateErrorMessage('attributeName');
  // }

  // validateDataName() {
  //   return this.validateErrorMessage('dataName');
  // }

  // validateDataType() {
  //   return this.validateErrorMessage('dataType');
  // }

  // validateDataPattern() {
  //   return this.validateErrorMessage('dataPattern');
  // }

  // validateStartingFrom() {
  //   return this.validateErrorMessage('startingFrom');
  // }

  // validateEndingTo() {
  //   return this.validateErrorMessage('endingTo');
  // }

  // validateStartingLen() {
  //   return this.validateErrorMessage('startingLength');
  // }

  // validateEndingLen() {
  //   return this.validateErrorMessage('endingLength');
  // }

  // validateFixedLen() {
  //   return this.validateErrorMessage('fixedLength');
  // }

  // validateCharactersFor() {
  //   return this.validateErrorMessage('charactersFor');
  // }

  getFileNameHint() {
    return this.getHintMessage('fileName');
  }

  getDestinationHint() {
    return this.getHintMessage('destination');
  }

  getNoOfColsHint() {
    return this.getHintMessage('noOfCols');
  }

  getNoOfRowsHint() {
    return this.getHintMessage('noOfRows');
  }

  getColDelimeterHint() {
    return this.getHintMessage('colDelimeter');
  }

  // triggerResize() {
  //   // Wait for changes to be applied, then trigger textarea resize.
  //   this._ngZone.onStable.pipe(take(1))
  //     .subscribe(() => this.autosize.resizeToFitContent(true));
  // }

  onReset() {
    if (this.formGroup.valid) {
      // this.formGroup.reset();
      this.setDefaultValues();
    }
  }

  setDefaultValues() {

    // this.formGroup.markAsPristine();
    // this.formGroup.markAsUntouched();
    // this.formGroup.updateValueAndValidity();

    this.formGroup.reset({
      fileName: '',
      destination: 'C:/Users/Public/Desktop',
      noOfCols: '1',
      noOfRows: '1',
      colDelimeter: ',',
      attributeName: '',
      dataType: '',
      dataPattern: '',
      startingFrom: '1',
      endingTo: '1',
      startingLength: '1',
      endingLength: '1',
      fixedLength: '1',
      charactersFor: ''
    });

    /* this.formGroup.patchValue({
      // fileName: '',
      destination: 'C:/Users/Public/Desktop',
      noOfCols: '1',
      noOfRows: '1',
      colDelimeter: ',',
      attributeName: '',
      dataType: '',
      dataPattern: '',
      startingFrom: '1',
      endingTo: '1',
      startingLength: '1',
      endingLength: '1',
      fixedLength: '1',
      charactersFor: ''
    }); */
  }

  onSubmit(post: any) {
    if (this.formGroup.valid) {
      // console.log("Form Submitted!");
      post.requestId = 0;

      /* postFormatList = {
        requestId: { value: 'Request ID', key: 'requestId' },
        fileName: { value: 'File Name', key: 'fileName' },
        destination: { value: 'Destination', key: 'destination' },
        noOfCols: { value: 'No. of Columns', key: 'noOfCols' },
        noOfRows: { value: 'No. of Rows', key: 'noOfRows' },
        colDelimeter: { value: 'Column Delimeter', key: 'colDelimeter' },
        attributeName: { value: 'Attribute Name', key: 'attributeName' },
        dataType: { value: 'Data Type', key: 'dataType' },
        dataPattern: { value: 'Data Pattern', key: 'dataPattern' },
        startingFrom: { value: 'Starting From', key: 'startingFrom' },
        endingTo: { value: 'Ending To', key: 'endingTo' },
        startingLength: { value: 'Starting Length', key: 'startingLength' },
        endingLength: { value: 'Ending Length', key: 'endingLength' },
        fixedLength: { value: 'Fixed Length', key: 'fixedLength' },
        charactersFor: { value: 'Fixed Length', key: 'charactersFor' },
        userId: { value: 'userId', key: 'userId' }
      }; */

      /* newPost = {
        post.this.postFormatList.requestId.value : post[this.postFormatList['requestId'].key]
      } */

      this.service.getUserID().then(res => {
        console.log('========== res ===================');
        console.log(res.userName);
        console.log('========== res ===================');
        post.userId = res.userName;
        this.post = post;
        this.service.postDataRequest(post).then(postResponse => {
          console.log(postResponse);
          console.log('Form Submitted....');
          // this.formGroup.reset();
          this.generateDataRequest(post);

        });
      });
    }
  }

  generateDataRequest(post: any) {
    this.service.generateDataRequest(post).then(res => {
      console.log('File Generated....');
      this.showSuccessMessage(this.successMessage, this.actionMessage);
      this.setDefaultValues();
    });
  }

  doReload() {
    this.navigateToHome('/datagen');
  }

}

