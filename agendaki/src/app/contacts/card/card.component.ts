import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ContactsService } from '../shared/contacts.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() firstName = '';
  @Input() lastName = '';
  @Input() phone = '';
  @Input() avatar = '';
  @Input() gender = '';
  @Input() isFavorite: boolean;
  @Input() id = '';
  @Output() deleted = new EventEmitter<void>();

  constructor(private service: ContactsService, public dialog: MatDialog) { }
  flag = false;
  ngOnInit() {
  }

  delContact(id) {
     this.openDialog().subscribe(data => {
       if (data) {
        this.service.deleteContact(id).subscribe(
          sucess => {
            console.log('sucesso');
            this.deleted.emit();
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

    const dialogRef = this.dialog.open(AlertModelComponent, dialogConfig);

    return dialogRef.afterClosed();
  }

  favVerif(id) {
    this.isFavorite = !this.isFavorite;
    this.service.getContact(id).subscribe(data => {
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
  templateUrl: './model-alert.component.html',
  styleUrls: ['./card.component.css']
})
export class AlertModelComponent {

  verif = false;

  constructor(
    public dialogRef: MatDialogRef<AlertModelComponent>,
    @Inject(MAT_DIALOG_DATA) data) {}

    onNoClick(): void {
      this.dialogRef.close(this.verif);
    }

    save() {
      this.verif = true;
      this.dialogRef.close(this.verif);
   }
}
