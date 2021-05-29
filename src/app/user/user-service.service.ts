import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl : string = 'https://localhost:44323/api/';
  
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.baseUrl + 'users');
  }

  getUser(username : string){
    return this.http.get<User>(this.baseUrl + 'users/' + username);
  }





}
