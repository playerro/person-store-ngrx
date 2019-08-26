import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PersonInput} from './person-input';
import {PersonList} from './person-list';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {people} from './people';
import {FilterSelect} from './filter-select';

@NgModule({
  declarations: [
    AppComponent,
    PersonInput,
    PersonList,
    FilterSelect,
    PartyStats
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(people, {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
