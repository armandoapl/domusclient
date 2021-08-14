import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Property } from 'src/app/_models/Property';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input() property: Property;
  @Input() isEdit: boolean = false;

  mainPhoto: SafeUrl;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {    
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
