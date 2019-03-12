import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ContactsService } from '../contacts/shared/contacts.service';
import { Contact } from '../contacts/shared/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverGuard implements Resolve<Contact> {
  constructor(private service: ContactsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact> {

    if (route.params && route.params.id) {

      return this.service.getContact(route.params.id);
    }

    return of(null);
  }
}
