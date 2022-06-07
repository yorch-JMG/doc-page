import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { ApiUserService } from '../services/api-user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private apiUserService: ApiUserService) {}



  canActivate(route: ActivatedRouteSnapshot) {
    const user = this.apiUserService.userData;
    if (user) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
