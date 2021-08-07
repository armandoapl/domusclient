import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
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

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private agentService: AgentsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadAgent();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];

    this.agent.photos.forEach(photo => {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    });

    return imageUrls;

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
