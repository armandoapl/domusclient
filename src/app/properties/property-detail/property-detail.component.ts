import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
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
  
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private propertiesService: PropertiesService, 
    private route: ActivatedRoute,
    private agentService: AgentsService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadProperty();

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
  
  // here I set the image of the property to the galleryImages
  getImages(): NgxGalleryImage[] {
    const imageUrls = [];

    this.property.photos.forEach(photo => {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    });

    return imageUrls;
  }

  loadProperty(){
    this.propertiesService.getProperty(+this.route.snapshot.paramMap.get('id'))
      .subscribe(property => {
        this.property = property;
      })
  }

  
  getAgentUsername(id){

      
    this.agentService.getUserById(id)
      .subscribe(username => {
        console.log( 'entering the getAgentUsername method, this is the username: ' + username);
        this.userName = username
        this.router.navigateByUrl('/agents/'+ this.userName);
      });
  }


}
