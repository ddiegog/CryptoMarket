import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';
import { DataService } from '../services/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(private commonService: CommonService, private router: Router, private dataService: DataService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
      let wallet = this.commonService.getWalletLinked();
      let hasJWT = this.commonService.hasJWT();

      if(wallet && hasJWT) {
        this.commonService.verifyToken(()=> {
          this.router.navigate(["/home"]);
          this.commonService.logOut();
        });
        return true;
      }
      else 
        return this.router.parseUrl('/home');
  }

}
