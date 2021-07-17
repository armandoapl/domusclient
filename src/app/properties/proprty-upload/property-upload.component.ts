import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';
import { Property } from 'src/app/_models/Property';

@Component({
  selector: 'app-property-upload',
  templateUrl: './property-upload.component.html',
  styleUrls: ['./property-upload.component.css']
})
export class PropertyUploadComponent implements OnInit {
  
  newPropertyForm: FormGroup;
  validationErrors: string[] = [];
  
  newProperty : Property;
  firstFormSent: boolean = false;

  constructor(
    private propertiesService: PropertiesService,
    private fb: FormBuilder,  private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){



    this.newPropertyForm = this.fb.group({
      
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['',Validators.required],
      address: ['', Validators.required]
    });

    // this.newPropertyForm = this.fb.group({
    //   title: ['', Validators.required],
    //   description: ['',Validators.required],
    //   city: ['', Validators.required],
    //   country:['', Validators.required],
    //   adress: ['',Validators.required]
    // });
  }

  uploadProperty(){
                           //this.activatedRoute.snapshot.paramMap.get('userName')
    console.log('agentId ',this.activatedRoute.snapshot.paramMap.get('id'));
    const property: Property ={
      id: null,
      title: this.newPropertyForm.get('title').value,
      description: this.newPropertyForm.get('description').value,
      city: this.newPropertyForm.get('city').value,
      country: this.newPropertyForm.get('country').value,
      appUserId: +this.activatedRoute.snapshot.paramMap.get('id'),
      address: this.newPropertyForm.get('address').value,
      photoUrl: null,
      photos: null
    }
    this.propertiesService.registerProperty(property).subscribe(propertyResponse =>{
      //this.router.navigateByUrl('/upload-photo-upload/'+propertyResponse.id);
      this.newProperty = propertyResponse;
      this.firstFormSent = true;
      }, errorResponse => {
        this.validationErrors = errorResponse;
        console.log(errorResponse);
      });
  }

  endPhotoUpload(){
    this.router.navigateByUrl('/properties/'+this.newProperty.id);
  }

  cancel(){
    console.log('cancelled');
  }

}
