import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';
import { Property } from 'src/app/_models/Property';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styles: [
  ]
})
export class PropertyDetailComponent implements OnInit {

  property: Property;

  constructor(private propertiesService: PropertiesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProperty();
  }

  loadProperty(){
    this.propertiesService.getProperty(+this.route.snapshot.paramMap.get('id'))
      .subscribe(property => {
        this.property = property;
      })
  }

}
