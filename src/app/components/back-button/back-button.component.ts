import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.sass']
})
export class BackButtonComponent implements OnInit {
  @Input() link: string;
  @Input() title: string;

  constructor(private _location: Location) { }

  ngOnInit() {
    this.link = '';
  }

  back(){
    this._location.back();
  }

}
