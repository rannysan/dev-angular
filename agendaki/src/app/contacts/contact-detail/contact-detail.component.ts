import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ContactsService } from '../shared/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, Subject, empty } from 'rxjs';
import { Contact } from '../shared/contacts';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit, OnDestroy {

  id: string;
  sub: Subscription;
  contact$: Observable<Contact>;
  error$ = new Subject<boolean>();
  flag = false;

  constructor(private route: ActivatedRoute, private service: ContactsService, private location: Location, public dialog: MatDialog) {
    // this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params: any) => {
        this.id = params.id;
        this.getContact$();
      }
    );

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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

  cancel() {
    this.location.back();
  }

  delContact(id) {
    this.openDialog().subscribe(data => {
      if (data) {
       this.service.deleteContact(id).subscribe(
         sucess => {
           console.log('sucesso');
           this.location.back();
         },
           error => console.log(error),
           () => console.log('request completa')
       );
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

   const dialogRef = this.dialog.open(AlertDelComponent, dialogConfig);

   return dialogRef.afterClosed();
 }

 favVerif(id, event) {
  this.service.getContact(id).subscribe(data => {
    if (data.isFavorite) {
      event.path[0].style = 'color: black';
    } else {
      event.path[0].style = 'color: yellow';
    }
    data.isFavorite = !data.isFavorite;
    this.service.save(data).subscribe(
      sucess => {
        console.log('sucesso');
      },
      error => console.log(error),
      () => console.log('request completa')
    );
  });
}

}

@Component({
  selector: 'app-alert-model',
  templateUrl: '../card/model-alert.component.html',
  styleUrls: ['../card/card.component.css']
})
export class AlertDelComponent {

  verif = false;

  constructor(
    public dialogRef: MatDialogRef<AlertDelComponent>,
    @Inject(MAT_DIALOG_DATA) data) {}

    onNoClick(): void {
      this.dialogRef.close(this.verif);
    }

    save() {
      this.verif = true;
      this.dialogRef.close(this.verif);
   }
}
