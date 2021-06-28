import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgentsService } from 'src/app/services/agents.service';
import { Agent } from 'src/app/_models/agent';
import { Property } from 'src/app/_models/Property';

@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.css']
})
export class AgentDetailComponent implements OnInit {

  agent: Agent; 
  properties: Property[];

  constructor(private agentService: AgentsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadAgent();
  }

  loadAgent(){
    this.agentService
      .getAgent(this.activatedRoute.snapshot.paramMap.get('userName'))
      .subscribe(agent =>{
        this.agent = agent;
        this.properties = agent.properties;
        }
      );
  }

}
