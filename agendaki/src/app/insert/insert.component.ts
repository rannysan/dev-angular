import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, empty, Subject } from 'rxjs';
import { Contact } from '../contacts';
import { catchError } from 'rxjs/operators';


export interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
  public form = this.fb.group({
    firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    gender: [null, Validators.required],
    avatar: [null, [Validators.required, Validators.minLength(3)]],
    company: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    address: [null, Validators.minLength(3)],
    phone: [null, Validators.minLength(3)],
    comments: [null],
    isFavorite: [false],
    id: [null]
  });

  submitted = false;
  sub: Subscription;
  id: number;
  contact$: Observable<any>;
  error$ = new Subject<boolean>();

  genders: Gender[] = [
    {value: 'm', viewValue: 'Homem'},
    {value: 'f', viewValue: 'Mulher'}
  ];

  // tslint:disable-next-line:align
  photoView: any = '../../assets/images/ContatoEx.png';

  constructor(
    private fb: FormBuilder,
    private service: ContactsService,
    private location: Location,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    const contact = this.route.snapshot.data['contact'];
    if (contact !== null) {
      const auxCont = this.transformContact(contact);
      this.form.patchValue(auxCont);
    }
    console.log(contact);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.service.save(this.form.value).subscribe(
        sucess => {
          console.log('sucesso');
          this.location.back();
        },
        error => console.log(error),
        () => console.log('request completa')
      );
    }
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

  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.location.back();
  }

  transformContact(contact) {
    const aux = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      gender: contact.gender,
      isFavorite: contact.isFavorite,
      company: contact.info.company,
      avatar: contact.info.avatar,
      address: contact.info.address,
      phone: contact.info.phone,
      comments: contact.info.comments,
      id: contact.id
    };

    return aux;
  }

}
