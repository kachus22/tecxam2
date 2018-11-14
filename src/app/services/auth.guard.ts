import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      const redirectUrl = route['_routerState']['url'];

      if (this.loginService.isLogged()) {
        return true;
      }

      this.router.navigateByUrl(
        this.router.createUrlTree(
          ['login'], {
            queryParams: {
              redirectUrl
            }
          }
        )
      );

      return false;
  }
}
