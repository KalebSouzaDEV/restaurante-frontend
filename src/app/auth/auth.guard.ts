
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class clientGuard implements CanActivate {
  constructor(private route: Router, private authService: AuthService){}
  
  canActivate(): boolean {
    if (this.authService.isAuthenticated('client')) {
      return true;
    } else {
      this.route.navigate(["login"])
      return false;
    }
  }
};

@Injectable({
  providedIn: 'root'
})

export class adminGuard implements CanActivate {
  constructor(private route: Router, private authService: AuthService){}
  
  canActivate(): boolean {
    if (this.authService.isAuthenticated('admin')) {
      return true;
    } else {
      this.route.navigate(["login"])
      return false;
    }
  }
};