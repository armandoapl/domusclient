import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../authentication/account.service';
import {User} from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService){}

  canActivate() : Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user=> {
        if(user)return true;
        this.toastr.error('No estas autorizado a entrar a esta ruta');
      }) 
    );
  }
  
}
