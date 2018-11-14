import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-next-button',
  templateUrl: './next-button.component.html',
  styleUrls: ['./next-button.component.sass']
})
export class NextButtonComponent implements OnInit {
  @Input() link: string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
