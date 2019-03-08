import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsService } from './../contacts.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, Subject, empty } from 'rxjs';
import { Contact } from '../contacts';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit, OnDestroy {

  id: string;
  sub: Subscription;
  contact$: Observable<Contact>;
  error$ = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private service: ContactsService, private location: Location) {
    // this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params: any) => {
        // tslint:disable-next-line:no-string-literal
        this.id = params['id'];
      }
    );
    this.getContact$();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getContact$() {
    this.contact$ = this.service.getContact(this.id)
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    );
  }

  cancel() {
    this.location.back();
  }

}
