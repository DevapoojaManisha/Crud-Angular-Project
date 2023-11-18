import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  constructor() { }
   setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery(): BehaviorSubject<string> {
    return this.searchQuerySubject;
  }
}
