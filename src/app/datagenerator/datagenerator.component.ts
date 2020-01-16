import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventEmitterService } from '../event-emitter.service';
import { ActivatedRoute, Router, Routes, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
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
  successMessage = 'Successfully submitted the request form';
  actionMessage = 'Success!';

  error: JSONObject[] = [
    { key: 'fileName', value: 'Enter file name without spaces. For eg., "NEWFILENAME01"' },
    { key: 'destination', value: 'Enter destination, you can provide your desktop location' },
    { key: 'noOfCols', value: 'Enter number of columns' },
    { key: 'noOfRows', value: 'Enter number of rows' },
    { key: 'colDelimeter', value: 'Enter column delimeter' },
    { key: 'attributeName', value: 'Enter attribute name' },
    // { key: 'dataName', value: 'Enter data name' },
    { key: 'dataType', value: 'Enter data type' },
    { key: 'dataPattern', value: 'Enter data pattern' },
    { key: 'startingFrom', value: 'Enter starting from' },
    { key: 'endingTo', value: 'Enter ending to' },
    { key: 'startingLength', value: 'Enter starting length' },
    { key: 'endingLength', value: 'Enter ending length' },
    { key: 'fixedLength', value: 'Enter number' },
    { key: 'charactersFor', value: 'Enter some characters' }
  ];

  hint: JSONObject[] = [
    { key: 'fileName', value: 'Enter any file name. For eg., "NEWFILENAME01"' },
    { key: 'destination', value: 'Provide your desktop location' },
    { key: 'noOfCols', value: 'Enter valid number' },
    { key: 'noOfRows', value: 'Enter valid number' },
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

  dataTypeList: JsonFormat[] = [
    { name: 'New data set', id: 'newData' },
    { name: 'Existing data backup', id: 'existingData' },
    { name: 'Data with masking', id: 'maskData' },
    { name: 'Data with encrypted', id: 'encryptedData' }
  ];

  dataFormatList: JsonFormat[] = [
    { name: 'Flat file', id: 'flat' },
    { name: 'XML', id: 'xml' },
    { name: 'JSON', id: 'json' },
    { name: 'Database', id: 'database' }
  ];

  title = 'Data Generator';

  filterDataTypeList: Observable<JsonFormat[]>;

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

    this.filterDataTypeList = this.formGroup.get('dataType')!.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this._filter(name) : this.dataTypeList.slice())
      );

    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeSetHomeTitle.subscribe((name: string) => {
        this.setTitle();
      });
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

  createForm() {
    this.formGroup = new FormGroup({
      fileName: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      noOfCols: new FormControl('', [Validators.required]),
      noOfRows: new FormControl('', [Validators.required]),
      colDelimeter: new FormControl('', [Validators.required]),
      attributeName: new FormControl('', [Validators.required]),
      // dataName: new FormControl('', [Validators.required]),
      dataType: new FormControl('', [Validators.required]),
      dataPattern: new FormControl('', [Validators.required]),
      startingFrom: new FormControl('', [Validators.required]),
      endingTo: new FormControl('', [Validators.required]),
      startingLength: new FormControl('', [Validators.required]),
      endingLength: new FormControl('', [Validators.required]),
      fixedLength: new FormControl('', [Validators.required]),
      charactersFor: new FormControl('', [Validators.required])
    });
  }

  private _filter(value: string): JsonFormat[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.dataTypeList.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0);
    }
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
    return this.formGroup.get(param).hasError('required') ? this.returnMessage(param, false) : '';
  }

  getHintMessage(param: string) {
    return this.returnMessage(param, true);
  }

  validateFileName() {
    return this.validateErrorMessage('fileName');
  }

  validateDestination() {
    return this.validateErrorMessage('destination');
  }

  validateNoOfCols() {
    return this.validateErrorMessage('noOfCols');
  }

  validateNoOfRows() {
    return this.validateErrorMessage('noOfRows');
  }

  validateDelimeter() {
    return this.validateErrorMessage('colDelimeter');
  }

  validateAttributeName() {
    return this.validateErrorMessage('attributeName');
  }

  // validateDataName() {
  //   return this.validateErrorMessage('dataName');
  // }

  validateDataType() {
    return this.validateErrorMessage('dataType');
  }

  validateDataPattern() {
    return this.validateErrorMessage('dataPattern');
  }

  validateStartingFrom() {
    return this.validateErrorMessage('startingFrom');
  }

  validateEndingTo() {
    return this.validateErrorMessage('endingTo');
  }

  validateStartingLen() {
    return this.validateErrorMessage('startingLength');
  }

  validateEndingLen() {
    return this.validateErrorMessage('endingLength');
  }

  validateFixedLen() {
    return this.validateErrorMessage('fixedLength');
  }

  validateCharactersFor() {
    return this.validateErrorMessage('charactersFor');
  }

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
      this.formGroup.reset();
    }
  }

  onSubmit(post: any) {
    if (this.formGroup.valid) {
      // console.log("Form Submitted!");
      this.post = post;
      this.service.postDataRequest(post).then(res => {
        console.log('Form Submitted....');
        // this.formGroup.reset();
        this.generateDataRequest(post);
        this.showSuccessMessage(this.successMessage, this.actionMessage);
        this.doReload();
      });
    }
  }

  generateDataRequest(post: any) {
    this.service.generateDataRequest(post).then(res => {
      console.log('File Generated....');
    });
  }

  doReload() {
    this.navigateToHome('/datagen');
  }

}
