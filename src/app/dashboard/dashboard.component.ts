import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Routes, RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ErrorStateMatcher,
  MatPaginator,
  MatProgressBar,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { take, startWith, map } from 'rxjs/operators';

export interface UserData {
  id: string;
  name: string;
  status: string;
  // progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'red', 'orange', 'green', 'lime'
];

const STATUS: string[] = [
  'REJECTED', 'IN PROGRESS', 'COMPLETED', 'IN QUEUE'
];

// const COLORS: string[] = [
//   'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
//   'aqua', 'blue', 'navy', 'black', 'gray'
// ];
const NAMES: string[] = [
  'Kennedy', 'Antony', 'Adam', 'Ester', 'Murali', 'Jack', 'Vijay', 'Krish', 'Gaurav', 'Aravind',
  'Pankaj', 'Ashok', 'Prashant', 'Soma', 'Tony', 'Saurav', 'Mercy', 'Thomas', 'Tom'
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    DashboardService
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'status'];
  dataSource: MatTableDataSource<UserData>;

  intervalId: any;
  timeInterval = 10000;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: DashboardService) {
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) =>
    //   this.createNewUser(10340 + k)
    // );
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.getAllRequests();
    this.intervalId = setInterval(() => {
      this.getAllRequests();
    }, this.timeInterval);

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  getAllRequests() {
    /* this.service.getList().then(res => {
      this.displayedColumns = Object.keys(res[0]);
      this.displayedColumns.splice(this.displayedColumns.indexOf('color'), 1);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }); */

    this.service.getList().subscribe(res => {
      this.displayedColumns = Object.keys(res[0]);
      this.displayedColumns.splice(this.displayedColumns.indexOf('color'), 1);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (e: HttpErrorResponse) => {
        console.log(e);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* Builds mock data without JSON file  */
  createNewUser(id: number): UserData {
    const nameVal = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    const idx = Math.round(Math.random() * (COLORS.length - 1));

    return {
      id: id.toString(),
      name: nameVal,
      status: STATUS[idx],
      color: COLORS[idx]
    };
  }
}
