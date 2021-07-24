import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/app/_models/Property';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input() property: Property;
  
  mainPhoto: string;
  constructor() { }

  ngOnInit(): void {
    this.mainPhoto = this.property.photoUrl;
    console.log('property', this.property);
  }

}
