import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertiesService } from 'src/app/services/properties.service';
import { Property } from 'src/app/_models/Property';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styles: [
  ]
})
export class PropertyListComponent implements OnInit {

  constructor(private propertiesService: PropertiesService) { }

  properties$: Observable<Property[]>;

  ngOnInit(): void {
    this.properties$ = this.propertiesService.getProperties();
  }



}
