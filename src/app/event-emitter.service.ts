import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  invokeSetHomeTitle = new EventEmitter();
  subsVar: Subscription;
  public constructor(
  ) { }

  onSetTitle(){
    this.invokeSetHomeTitle.emit();
  }
}
