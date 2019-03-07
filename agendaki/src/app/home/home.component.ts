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

  constructor(private service: ContactsService) { }

  ngOnInit() {
    // this.service.list().subscribe(dados => this.contacts = dados);
    // this.contacts$ = this.service.list()
    // .pipe(
    //   catchError(error => {
    //     console.error(error);
    //     this.error$.next(true);
    //     return empty();
    //   })
    // );
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
  }

}
