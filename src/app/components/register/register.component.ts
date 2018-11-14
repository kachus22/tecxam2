import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.sass']
})
export class RegisterComponent implements OnInit {

  @Output() success = new EventEmitter<boolean>();
  @Output() switch = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onChange(){
    this.switch.emit(true);
  }

  onSubmit(f: NgForm){
    this.success.emit(false);
    // let password = '1234567a';
    // let user = 'test';
    // if(f.value.user == user && f.value.password == password){
    //   localStorage.setItem('user', user);
    //   localStorage.setItem('password', password);
    //   this.success.emit(true);
    // }
    // else{
    //   this.success.emit(false);
    // }
  }

  // validateEmail(email) {
  //   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // }
  validateUser(email) {
    return true
  }

}
