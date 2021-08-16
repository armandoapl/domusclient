import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
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

  properties: Property[] = [];

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProperties() {
    if(this.properties.length > 0)
      return of(this.properties);

    return this.http.get<Property[]>(this.baseUrl + 'properties').pipe(
      map(properties => {
        this.properties = properties;
        return properties;
      })
    );
  }

  getProperty(id: number){
    const property = this.properties.find(property => property.id === id);
    if(property !== undefined)
      return of(property);

    return this.http.get<Property>(this.baseUrl + 'properties/' +id);
  }

  updateProperty(id: number){
    
  }

  deleteProperty(photoId: number){
    return this.http.delete(this.baseUrl+'properties/' +photoId);
  }

  registerProperty(propertyToCreate: Property){
   
    let objectSent = {
      Title: propertyToCreate.title,
      Description: propertyToCreate.description,
      City: propertyToCreate.city,
      Country: propertyToCreate.country,
      AppUserId: propertyToCreate.appUserId,
      Address: propertyToCreate.address

    };
    return this.http.post<Property>(this.baseUrl + 'properties', objectSent);
  }


  setMainPhoto(photoId: number, propertyId: number){

    console.log('propertyService setp');
    return this.http.put(this.baseUrl + 'properties/set-main-photo/' + photoId + '/' + propertyId, {});
  }

  deletePhoto(photoId: number , propertyId: number){

    console.log('propertyService deletep');
    return this.http.delete(this.baseUrl + 'properties/delete-photo/' + photoId + '/' + propertyId);
  }


}
