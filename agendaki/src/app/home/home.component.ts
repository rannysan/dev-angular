import { Component, OnInit } from '@angular/core';
import { ContactsService } from './../contacts.service';
import { Contact } from './../contacts';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // contacts: Contact[];
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

}
