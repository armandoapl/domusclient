import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentsService } from 'src/app/services/agents.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Property } from 'src/app/_models/Property';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  property: Property;
  userName: string;
  constructor(
    private propertiesService: PropertiesService, 
    private route: ActivatedRoute,
    private agentService: AgentsService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadProperty();
  }

  loadProperty(){
    this.propertiesService.getProperty(+this.route.snapshot.paramMap.get('id'))
      .subscribe(property => {
        this.property = property;
      })
  }

  
  getAgentUsername(id){

    console.log('file: property-detail.component.ts, method getAgentUsername, id: ' + id);
      
    this.agentService.getUserById(id)
      .subscribe(username => {
        console.log( 'entering the getAgentUsername method, this is the username: ' + username);
        this.userName = username
        this.router.navigateByUrl('/agents/'+ this.userName);
      });
  }


}
