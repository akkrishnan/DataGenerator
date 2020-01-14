import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventEmitterService } from '../event-emitter.service';
import { ActivatedRoute, Router, Routes, RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import {
  ErrorStateMatcher,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { DataSource } from '@angular/cdk/table';
// import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Observable } from 'rxjs';
import { take, startWith, map } from 'rxjs/operators';
// import { CustomValidatorsService } from './custom-validators.service';


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
  styleUrls: ['./datagenerator.component.scss']
})
export class DatageneratorComponent implements OnInit {

  formGroup: FormGroup;
  post: any = '';
  error: JSONObject[] = [
    { key: 'fileName', value: 'Enter file name without spaces. For eg., "NEWFILENAME01"' },
    { key: 'destination', value: 'Enter destination, you can provide your desktop location' },
    { key: 'noOfCols', value: 'Enter number of columns' },
    { key: 'noOfRows', value: 'Enter number of rows' },
    { key: 'colDecimeter', value: 'Enter column decimeter' },
    { key: 'attributeName', value: 'Enter attribute name' },
    { key: 'dataName', value: 'Enter data name' },
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
    { key: 'colDecimeter', value: 'For eg. Comma (,) can be entered' }
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

  requestTypesList: JsonFormat[] = [
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

  constructor(
    private titleService: Title,
    private eventEmitterService: EventEmitterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate();

    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeSetHomeTitle.subscribe((name: string) => {
        this.setTitle();
      });
    }
  }

  setTitle() {
    this.titleService.setTitle('Data Generator');
  }

  navigateToHome(urlString: string) {
    this.router.navigate([urlString]);
  }

  doLogout() {
    this.navigateToHome('');
  }

  createForm() {
    this.formGroup = new FormGroup({
      fileName: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      noOfCols: new FormControl('', [Validators.required]),
      noOfRows: new FormControl('', [Validators.required]),
      colDecimeter: new FormControl('', [Validators.required]),
      attributeName: new FormControl('', [Validators.required]),
      dataName: new FormControl('', [Validators.required]),
      dataPattern: new FormControl('', [Validators.required]),
      startingFrom: new FormControl('', [Validators.required]),
      endingTo: new FormControl('', [Validators.required]),
      startingLength: new FormControl('', [Validators.required]),
      endingLength: new FormControl('', [Validators.required]),
      fixedLength: new FormControl('', [Validators.required]),
      charactersFor: new FormControl('', [Validators.required])
    });
  }

  // private _filter(value: string): JsonFormat[] {
  //   if (value) {
  //     const filterValue = value.toLowerCase();
  //     return this.projectNameList.filter(proj => proj.name.toLowerCase().indexOf(filterValue) === 0);
  //   }
  // }

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

  validateDecimeter() {
    return this.validateErrorMessage('colDecimeter');
  }

  validateAttributeName() {
    return this.validateErrorMessage('attributeName');
  }

  validateDataName() {
    return this.validateErrorMessage('dataName');
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

  getColDecimeterHint() {
    return this.getHintMessage('colDecimeter');
  }

  // triggerResize() {
  //   // Wait for changes to be applied, then trigger textarea resize.
  //   this._ngZone.onStable.pipe(take(1))
  //     .subscribe(() => this.autosize.resizeToFitContent(true));
  // }

  onSubmit(post: any) {
    this.post = post;
  }
}
