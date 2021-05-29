import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;
  user: any;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
    this.getUsers();
  }

  getUsers(){
     this.userService.getUsers().subscribe(users =>{
      this.users = users;
    });
  }

  getUser(){
     this.userService.getUser('1').subscribe(user => {
      this.user = user;
    }, error => {
      console.log(error);
    });
  }

}
