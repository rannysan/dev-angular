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
  form: FormGroup;
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

    this.form = this.fb.group({
      id: [contact.id],
      firstName: [contact.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: [contact.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [contact.email, [Validators.required, Validators.email]],
      gender: [contact.gender, Validators.required],
      isFavorite: [contact.isFavorite],
      company: [contact.info.company, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      avatar: [contact.info.avatar, [Validators.required, Validators.minLength(3)]],
      address: [contact.info.address, Validators.minLength(3)],
      phone: [contact.info.phone, Validators.minLength(3)],
      comments: [contact.info.comments]
    });
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

}
