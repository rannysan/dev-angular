import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactsService } from './../contacts.service';

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
  @Input() isFavorite = '';
  @Input() id = '';
  @Output() deleted = new EventEmitter<void>();

  constructor(private service: ContactsService) { }

  ngOnInit() {
  }

  delContact(id) {
    this.service.deleteContact(id).subscribe(
      sucess => {
        console.log('sucesso');
        this.deleted.emit();
      },
        error => console.log(error),
        () => console.log('request completa')
    );
  }

}
