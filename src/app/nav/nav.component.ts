import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../authentication/account.service';
import { User } from '../_models/User';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  model: any = {};
  loggedIn: boolean;
  currentUser$: Observable<User>;

  constructor(
    private accountService: AccountService, 
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void { 
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
      this.accountService.login(this.model).subscribe(response => {
        this.router.navigateByUrl('/agents');
      }, errorResponse=> {
        console.log(errorResponse);
        this.toastr.error(errorResponse.error);
      });
  }

  logOut(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
