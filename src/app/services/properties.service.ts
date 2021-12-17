import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/paginations';
import { Property } from '../_models/Property';
import { UserPropertyParams } from '../_models/userPropertyParams';
import { SharedMethodService } from './shared-method.service';

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

  // paginatedResult: PaginatedResult<Property[]> = new PaginatedResult<Property[]>();

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private sharedMethodService: SharedMethodService) { }

  getProperties(UserPropertyParams: UserPropertyParams ) {

    let params = this.sharedMethodService.
    getPaginationHeaders(UserPropertyParams.pageNumber, UserPropertyParams.pageSize, UserPropertyParams.city);
    
    return this.sharedMethodService
    .getPaginatedResult<Property[]>(params, this.baseUrl+'properties');
    // let params =  new HttpParams();

    // if(params!== null && itemsPerPage!== null) {
    //   params = params.append('PageNumber', page.toString());
    //   params = params.append('PageSize',itemsPerPage.toString());
    // }
    // return this.http.get<Property[]>(this.baseUrl + 'properties', {observe:'response', params}).pipe(
    //   map(response => {
    //     this.paginatedResult.result = response.body;

    //     if(response.headers.get('Pagination') !== null ){
    //       this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
    //       console.log('this is in the service pagination', this.paginatedResult);
    //     }
    //     return this.paginatedResult;
    //   })
    // );
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
