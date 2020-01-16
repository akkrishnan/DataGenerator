import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedInUser = 'KRISH';

  title = 'Data Generator Tool';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateToHome(urlString: string) {
    this.router.navigate([urlString]);
  }

  doLogout() {
    this.navigateToHome('/login');
  }

}
