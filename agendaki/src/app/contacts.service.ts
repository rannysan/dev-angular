import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contacts';
import { environment } from 'src/environments/environment';
import { delay, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  public list() {
    return this.http.get<Contact[]>(`${this.API}contacts`)
    .pipe(
      delay(1000),
      tap(console.log)
    );
  }

  public getContact(id) {
    return this.http.get<Contact>(`${this.API}contacts/${id}`).pipe(take(1));
  }

  public newContact(contact) {
    return this.http.post(`${this.API}contacts`, contact).pipe(take(1));
  }

  public updateContact(contact) {
    return this.http.put(`${this.API}contacts/${contact.id}`, contact).pipe(take(1));
  }

  public deleteContact(id) {
    return this.http.delete(`${this.API}contacts/${id}`).pipe(take(1));
  }

  save(contact) {
    if (contact.id) {
      return this.updateContact(contact);
    }
    return this.newContact(contact);
  }
}
