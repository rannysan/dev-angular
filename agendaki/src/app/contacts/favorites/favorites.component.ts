import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../shared/contacts.service';
import { Contact } from '../shared/contacts';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  error$ = new Subject<boolean>();
  pageIndex = 0;
  pageSize = 5;
  lowValue = 0;
  highValue = 5;


  constructor(private service: ContactsService) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.contacts$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    );
    this.pageIndex = 0;
    this.pageSize = 5;
    this.lowValue = 0;
    this.highValue = 5;
  }

  onDeleted() {
    this.onRefresh();
  }

  getPaginatorData(event) {
     if (event.pageIndex === this.pageIndex + 1) {
        this.lowValue = this.lowValue + this.pageSize;
        this.highValue =  this.highValue + this.pageSize;
       } else if (event.pageIndex === this.pageIndex - 1) {
       this.lowValue = this.lowValue - this.pageSize;
       this.highValue =  this.highValue - this.pageSize;
      }
     this.pageIndex = event.pageIndex;
 }

 favArrayCreate(contacts) {
   const favArray = [];

   for (const c of contacts) {
      if (c.isFavorite) {
        favArray.push(c);
      }
   }
   return favArray;
 }

 getArrayFunctionLength(favArray) {
   return favArray.length;
 }

}
