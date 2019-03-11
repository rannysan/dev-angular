import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, empty, Subject} from 'rxjs';
import {map, startWith, catchError} from 'rxjs/operators';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contacts';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  myControl = new FormControl();
  error$ = new Subject<boolean>();
  options = [];
  filteredOptions: Observable<string[]>;

  constructor(private service: ContactsService) {
    this.loadContactFilter();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(c => (`${c.firstName} ${c.lastName}`).toLowerCase().indexOf(filterValue) === 0);
  }

  loadContactFilter() {
    this.service.list().subscribe(list => {
     this.options = list;
    });
  }
}
