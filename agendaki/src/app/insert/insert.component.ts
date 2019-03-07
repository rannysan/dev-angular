import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  genders: Gender[] = [
    {value: 'm', viewValue: 'Homem'},
    {value: 'f', viewValue: 'Mulher'}
  ];

  matcher = new MyErrorStateMatcher();
  // tslint:disable-next-line:align
  photoView: any = '../../assets/images/ContatoEx.png';

  constructor() { }

  ngOnInit() {
  }

}
