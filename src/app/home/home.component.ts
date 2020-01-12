import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Home Screen';

  constructor(
    private titleService: Title,
    private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit() {
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeSetHomeTitle.subscribe((name: string) => {
        this.setTitle();
      });
    }
  }

  setTitle() {
    this.titleService.setTitle('TTTTTT');
  }
}
