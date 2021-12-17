import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertiesService } from 'src/app/services/properties.service';
import { Pagination } from 'src/app/_models/paginations';
import { Property } from 'src/app/_models/Property';
import { UserPropertyParams } from 'src/app/_models/userPropertyParams';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styles: [
  ]
})
export class PropertyListComponent implements OnInit {

  constructor(private propertiesService: PropertiesService) { }

  properties: Property[];
  pagination: Pagination;
  propertyParams : UserPropertyParams = new UserPropertyParams();

  ngOnInit(): void {
    this.loadProperties()
  }

  loadProperties(){
    this.propertiesService.getProperties(this.propertyParams).subscribe(response => {
      this.properties = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any){
    this.propertyParams.pageNumber = event.page;
    this.loadProperties();
  }

}
