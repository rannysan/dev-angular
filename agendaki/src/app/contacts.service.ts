import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contacts';
import { environment } from 'src/environments/environment';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  public list() {
    return this.http.get<Contact[]>(`${this.API}contacts?limit=5`)
    .pipe(
      delay(1000),
      tap(console.log)
    );
  }

  public getContact(id) {
    return this.http.get<Contact[]>(`${this.API}contacts/${id}`)
    .pipe(
      delay(1000),
      tap(console.log)
    );
  }
}
