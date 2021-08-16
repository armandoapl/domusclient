import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Agent } from '../_models/Agent';
import { PaginatedResult } from '../_models/paginations';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  baseUrl = environment.apiUrl;
  agents: Agent [] = [];
  paginatedResult: PaginatedResult<Agent[]> = new PaginatedResult<Agent[]>();

  constructor(private http: HttpClient) { }

  getAgents(page?: number , itemsPerPage?: number) {
    // if(this.agents.length > 0) 
    //   return of(this.agents); // te fo operator (brought from RSJX) is making it's parameter an observable of($parameter)

    let params = new HttpParams();

    if(params !== null && itemsPerPage !== null){
      params = params.append("pageNumber", page.toString());
      params = params.append("pageSize", itemsPerPage.toString());
    }

    return this.http.get<Agent[]>(this.baseUrl +'users', {observe: 'response', params}).pipe(
      map(response =>{
        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination') !== null ) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );

  }

  getAgent(userName: string){

    const agent = this.agents.find(agent => agent.userName === userName);
    if(agent !== undefined)
      return of(agent);

    return this.http.get<Agent>(this.baseUrl + 'users/' +userName);
  }

  updateAgent(agent: Agent){

    return this.http.put(this.baseUrl + 'users', agent).pipe(
      map(() => {
        const index = this.agents.indexOf(agent);
        this.agents[index] = agent;
      })
    );
  }

  getUserById(id: number) {
    const userName = this.agents.find(agent => agent.id === id).userName;

    if(userName !== undefined)
      return of(userName);

    return this.http.get(this.baseUrl + 'users/get-by-id?id=' + id).pipe(
      map( (user: User)=> {
        let userNameFromRequest = user.userName;
        return userNameFromRequest;
      })
    )
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

}
