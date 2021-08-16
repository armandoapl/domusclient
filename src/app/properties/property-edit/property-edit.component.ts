import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AgentsService } from 'src/app/services/agents.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Property } from 'src/app/_models/Property';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})

export class PropertyEditComponent implements OnInit {

  property: Property;
  userName: string;
  
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private propertiesService: PropertiesService, 
    private route: ActivatedRoute,
    private agentService: AgentsService,
    private router: Router,
    private toastr: ToastrService,
    private _location: Location) { }

   ngOnInit() {
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
    //this.galleryImages = this.getImages();
  }
  
  // here I set the image of the property to the galleryImages
  

  loadProperty(){
    this.propertiesService.getProperty(+this.route.snapshot.paramMap.get('id'))
      .subscribe(property => {
        this.property = property;
      })
  }

  updateProperty(propertyId: number){
    //this.propertiesService.updateProperty(propertyId);
    console.log('Property Upload');
  }

  deleteProperty(propertyId: number){
    this.propertiesService.deleteProperty(propertyId).subscribe(()=> {
      this.toastr.success('Propiedad eliminada exitosamente');
      this._location.back();
      //this.router.navigateByUrl('property-edit/'+ this.pro);
    },
    error => {
      console.log('Algo salio mal con la peticion', error);
      this.toastr.error('Error al intentar eliminar la propiedad');
    });
  }

 


}
