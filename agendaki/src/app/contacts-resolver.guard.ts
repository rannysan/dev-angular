import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ContactsService } from './contacts.service';
import { Contact } from './contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverGuard implements Resolve<Contact> {
  constructor(private service: ContactsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact> {
    // tslint:disable-next-line:no-string-literal
    if (route.params && route.params['id']) {
      // tslint:disable-next-line:no-string-literal
      return this.service.getContact(route.params['id']);
    }

    return of({
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      gender: null,
      isFavorite: null,
      company: null,
      avatar: null,
      address: null,
      phone: null,
      comments: null
    });
  }
}
