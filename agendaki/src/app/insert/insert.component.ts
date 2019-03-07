import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ContactsService } from '../contacts.service';


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

  genders: Gender[] = [
    {value: 'm', viewValue: 'Homem'},
    {value: 'f', viewValue: 'Mulher'}
  ];

  // tslint:disable-next-line:align
  photoView: any = '../../assets/images/ContatoEx.png';

  constructor(private fb: FormBuilder, private service: ContactsService ) { }

  ngOnInit() {

    this.form = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      gender: [null, Validators.required],
      isFavorite: [false],
      company: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      avatar: [null, [Validators.required, Validators.minLength(3)]],
      address: [null, Validators.minLength(3)],
      phone: [null, Validators.minLength(3)],
      comments: [null]
    });

  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.service.newContact(this.form.value).subscribe(
        sucess => console.log('sucesso'),
        error => console.log(error),
        () => console.log('request completa')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    console.log('clicado');
  }

}
