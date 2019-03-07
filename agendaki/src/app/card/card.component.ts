import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
