import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Property } from '../_models/Property';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  // readonly httpOptions = {
  //   headers: new HttpHeaders({
  //     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  //     } 
  //   )
  // }

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProperties() {
    return this.http.get<Property[]>(this.baseUrl + 'properties');
  }

  getProperty(id: number){
    return this.http.get<Property>(this.baseUrl + 'properties/' +id);
  }


}
