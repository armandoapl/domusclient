import { Component, OnInit } from '@angular/core';
import { Agent } from '../../_models/agent';
import { AgentsService } from 'src/app/services/agents.service';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/paginations';
import { UserPropertyParams } from 'src/app/_models/userPropertyParams';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {

  agents: Agent[];
  pagination: Pagination;
  userParams: UserPropertyParams = new UserPropertyParams();
  
  constructor(
    private agentService: AgentsService, 
    private formBuilder: FormBuilder
    ) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(){
    this.agentService.getAgents(this.userParams).subscribe(response =>{
      this.agents = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.loadAgents();
  }


}
