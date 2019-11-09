import { Component, OnInit } from '@angular/core';
import { finalize, switchMap } from 'rxjs/operators';

import { QuoteService, User } from './quote.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  noData: string;
  users$: Observable<User[]>;
  keyword$ = new Subject();

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = true;
    this.isDataExist();
       this.searchTerm();
  }
  
  searchTerm() {
//,switchMap(term => { return this.searchUsers(term);
// })
  return this.keyword$.pipe(debounceTime(400),
          distinctUntilChanged()).subscribe(term => { 
            this.searchUsers(term) });
      }

  private isDataExist() { //check data exist
    if(!this.quoteService.isUsersExist()) {  this.noData; }
      this.fetchDataFromStorage();
  }

  fetchDataFromStorage() { //fetch data from storage
       this.isLoading = false;
       this.users$ = this.quoteService.fetchDataFromStorage();
 }
  
 searchUsers(term: any) {
   this.users$= this.quoteService.searchData(term)
 }

}
