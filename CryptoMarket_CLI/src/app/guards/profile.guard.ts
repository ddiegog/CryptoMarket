import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(private commonService: CommonService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
      let wallet = this.commonService.getWalletLinked();
      let hasJWT = this.commonService.hasJWT();

      if(wallet && hasJWT) 
        return true
      else 
        return this.router.parseUrl('/home');
    
  }
}