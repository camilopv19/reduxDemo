import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './store';
import { INCREMENT, DECREMENT } from './actions';
import { Map } from 'immutable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'redux-demo';
  @select('counter') _count; // Select a "slice" from the store, called "counter" as the respective 
  // interface variable, and returns it as an Observable, named "count"
  // which doesn't need to be initialized to 0

  // Accesing complex object in the store:
  // Way 1: Array of properties
  @select(['messaging', 'newMessages']) newMessages;
  // store.IAppState.messaging.newMessages

  // Way 2: Arrow function
  @select( (s: IAppState) => s.messaging.newMessages ) newMessagesCount;

  // Immutable
  @select( s => s.get('counter')) count;
  constructor(private ngRedux: NgRedux<IAppState>) {  }

  increment() {
    this.ngRedux.dispatch({
      type: INCREMENT
    });
  }
  decrement() {
    this.ngRedux.dispatch({
      type: DECREMENT
    });
  }
}
