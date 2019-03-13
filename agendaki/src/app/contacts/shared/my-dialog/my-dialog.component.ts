import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent {
  verif = false;

  constructor(
    public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {}

    onNoClick(): void {
      this.dialogRef.close(this.verif);
    }

    save() {
      this.verif = true;
      this.dialogRef.close(this.verif);
   }

}
