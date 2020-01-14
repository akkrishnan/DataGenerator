import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Routes, RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import {
  ErrorStateMatcher,
  MatPaginator,
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
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 1000 }, (_, k) =>
      this.createNewUser(Math.round(Math.random() * 10000000))
    );

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new User. */
  createNewUser(id: number): UserData {
    const nameVal = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    const idx = Math.round(Math.random() * (COLORS.length - 1));

    return {
      id: id.toString(),
      name: nameVal,
      status: STATUS[idx],
      // progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[idx]
    };
  }

}
