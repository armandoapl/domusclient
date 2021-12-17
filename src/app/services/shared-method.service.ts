import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/paginations';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodService {

  constructor(private http: HttpClient) { }

  getPaginationHeaders(pageNumber: number, pageSize: number, city: string){
    let params = new HttpParams();
    params = params.append("pageNumber",pageNumber.toString());
    params = params.append("pageSize",pageSize.toString());
    if (city !== '') {
      params = params.append("city",city);
    }
    

    return params;
  }

  getPaginatedResult<T>(params: HttpParams, url: string) : Observable<PaginatedResult<T>>{
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, {observe: 'response', params}).pipe(
      map(response =>{
        paginatedResult.result = response.body;

        if(response.headers.get('Pagination') !== null ) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
         return paginatedResult;
      })
    );
  }
}
