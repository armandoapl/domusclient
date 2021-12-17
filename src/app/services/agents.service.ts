import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Agent } from '../_models/Agent';
import { PaginatedResult } from '../_models/paginations';
import { User } from '../_models/User';
import { UserPropertyParams } from '../_models/userPropertyParams';
import { SharedMethodService } from './shared-method.service';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  baseUrl = environment.apiUrl;
  agents: Agent [] = [];

  constructor(private http: HttpClient, private sharedMethodService: SharedMethodService) { }

  // te it's parameter an observable of($parameter)
  getAgents(userParams: UserPropertyParams) {

    let params = this.sharedMethodService.getPaginationHeaders(userParams.pageNumber, userParams.pageSize, userParams.city);

    return this.sharedMethodService.getPaginatedResult<Agent[]>(params,this.baseUrl+'users');

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

  getCities() {
    return this.http.get(this.baseUrl + 'users/get-cities');
  }
  

}
