import {Component, ChangeDetectionStrategy} from '@angular/core';
import 'rxjs/Rx'
import {Observable} from 'rxjs/Observable';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideStore, Store} from '@ngrx/store';
import {id} from './id';
import {people} from './people';
import {partyFilter} from './party-filter';
import {partyModel, percentAttending} from './selectors';
import {reset, RESET_STATE} from './reset';
import {
  ADD_PERSON,
  REMOVE_PERSON,
  ADD_GUEST,
  REMOVE_GUEST,
  TOGGLE_ATTENDING
} from './actions';
import {PersonList} from './person-list';
import {PersonInput} from './person-input';
import {FilterSelect} from './filter-select';
import {PartyStats} from './party-stats';

@Component({
  selector: 'app-root',
  template: `
      <h3>@ngrx/store Party Planner</h3>
      <h3>@ngrx/store Party Planner</h3>
      <button (click)="resetParty()" class="margin-bottom-10">
          Reset Party
      </button>
      <div class="margin-bottom-10">
          Percent Attendance: {{percentAttendance | async}}%
      </div>
      <party-stats
              [invited]="(model | async)?.total"
              [attending]="(model | async)?.attending"
              [guests]="(model | async)?.guests"
      >
      </party-stats>
      <filter-select
              (updateFilter)="updateFilter($event)"
      >
      </filter-select>
      <person-input
              (addPerson)="addPerson($event)"
      >
      </person-input>
      <person-list
              [people]="(model | async)?.people"
              (addGuest)="addGuest($event)"
              (removeGuest)="removeGuest($event)"
              (removePerson)="removePerson($event)"
              (toggleAttending)="toggleAttending($event)"
      >
      </person-list>
    `,
  changeDetetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public people;
  public model;

  constructor(
    private _store: Store<AppState>
  ) {
    /*
      Observable of people, utilzing the async pipe
      in our templates this will be subscribed to, with
      new values being dispayed in our template.
      Unsubscribe wil be called automatically when component
      is disposed.
    */
    this.model = Observable.combineLatest(
      _store.select('people')
    _store.select('partyFilter')
  )
    //extracting party model to selector
  .let(partyModel());
    //for demonstration on combining selectors
    this.percentAttendance = _store.let(percentAttending());
  }

  }
  addPerson(name) {
    this._store.dispatch({type: ADD_PERSON, payload: {id: id(), name}});
  }

  addGuest(id) {
    this._store.dispatch({type: ADD_GUEST, payload: id});
  }

  removeGuest(id) {
    this._store.dispatch({type: REMOVE_GUEST, payload: id});
  }

  removePerson(id) {
    this._store.dispatch({type: REMOVE_PERSON, payload: id});
  }

  toggleAttending(id) {
    this._store.dispatch({type: TOGGLE_ATTENDING, payload: id});
  }
}


