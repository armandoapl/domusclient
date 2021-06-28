import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Agent } from '../_models/Agent';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  baseUrl = environment.apiUrl;
  agents: Agent [] = [];

  constructor(private http: HttpClient) { }

  getAgents() {
    if(this.agents.length > 0) 
      return of(this.agents); // te fo operator (brought from RSJX) is making it's parameter an observable of($parameter)

    return this.http.get<Agent[]>(this.baseUrl + 'users').pipe(
      map(agents => {
        this.agents = agents;
        return agents;
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

}
