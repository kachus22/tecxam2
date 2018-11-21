import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.sass']
})
export class RegisterComponent implements OnInit {

  @Output() success = new EventEmitter<boolean>();
  @Output() switch = new EventEmitter<boolean>();

  constructor(private service: RegisterService) { }

  ngOnInit() {
  }

  onChange(){
    this.switch.emit(true);
  }

  onSubmit(f: NgForm){
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))(@itesm\.mx)$/;
    if(regex.test(String(f.value.user).toLowerCase())){
      let postBody = { user: {email: f.value.user, password: f.value.password}}
      this.service.register(postBody)
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
    else{
      this.success.emit(false);
    }
  }
}
