import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  @Output() success = new EventEmitter<boolean>();
  @Output() switch = new EventEmitter<boolean>();

  constructor(private service: LoginService) { }

  ngOnInit() {
  }

  onChange(){
    this.switch.emit(true);
  }

  onSubmit(f: NgForm){
    let postBody = { user: {email: f.value.user, password: f.value.password}}
    this.service.login(postBody)
      .subscribe(
        (result) => {
          localStorage.setItem('email', f.value.user);
          localStorage.setItem('authorization', result.headers.get('authorization'));
          this.success.emit(true);
        },
        (error) => {
          console.error(error);
          this.success.emit(false);
        }
      );
  }

  // validateEmail(email) {
  //   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // }
  validateUser(email) {
    return true
  }
}
