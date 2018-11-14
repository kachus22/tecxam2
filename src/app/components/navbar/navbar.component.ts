import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  user: string;

  constructor(private logoutService: LogoutService, private router : Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('email');
  }

  logout(){
    this.logoutService.logout();
    setTimeout(() => {
        this.router.navigateByUrl('/login');
      }
      , 2200);
  }

}
