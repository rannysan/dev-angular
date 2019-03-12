import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ContactsService } from '../contacts/shared/contacts.service';
import { ActivatedRoute } from '@angular/router';

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
  refresh: boolean;

  constructor(private service: ContactsService, private route: ActivatedRoute) {
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

  getFlag() {
    this.refresh = this.service.getVerificator();
    if (this.refresh) {
      this.service.verificatorChange();
    }
    return this.refresh;
  }

  loadContactFilter(refresh) {
    if (refresh) {
      this.service.list().subscribe(list => {
        this.options = list;
       });
    }
  }
}
