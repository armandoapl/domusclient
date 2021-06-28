import { Component, OnInit } from '@angular/core';
import { Agent } from '../../_models/agent';
import { AgentsService } from 'src/app/services/agents.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {

  agents$: Observable<Agent[]>;

  constructor(private agentService: AgentsService) { }

  ngOnInit(): void {
    this.agents$ = this.agentService.getAgents();
  }


}
