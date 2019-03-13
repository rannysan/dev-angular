import { Component, OnInit, Inject } from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import { ContactsService } from '../shared/contacts.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';


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

    info: this.fb.group({
      avatar: [null, [Validators.required, Validators.minLength(3)]],
      company: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      address: [null, Validators.minLength(3)],
      phone: [null, Validators.minLength(3)],
      comments: [null]
    }),
    isFavorite: [false],
    id: [null]
  });

  submitted = false;
  sub: Subscription;
  id: number;
  contact$: Observable<any>;
  error$ = new Subject<boolean>();
  mensage = 'Confirme seu cadastro!';
  avatar: string;

  genders: Gender[] = [
    {value: 'm', viewValue: 'Homem'},
    {value: 'f', viewValue: 'Mulher'}
  ];

  photoView: any = '../../assets/images/ContatoEx.png';

  constructor(
    private fb: FormBuilder,
    private service: ContactsService,
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
       const contact = this.route.snapshot.data['contact'];
    if (contact !== null) {
      this.form.patchValue(contact);
      this.avatar = contact.info.avatar;
    }
    console.log(contact);
  }

  onSubmit() {

    this.openDialog().subscribe(data => {
      if (data) {
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
    });
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
    this.mensage = 'Deseja cancelar o cadastro?';
    this.openDialog().subscribe(data => {
      if (data) {
        this.submitted = false;
        this.form.reset();
        this.location.back();
      }
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        flag: false
    };

    const dialogRef = this.dialog.open(MyDialogComponent, dialogConfig);

    return dialogRef.afterClosed();
  }
}
