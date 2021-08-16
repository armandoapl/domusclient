import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/authentication/account.service';
import { AgentsService } from 'src/app/services/agents.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Agent } from 'src/app/_models/Agent';
import { Entity } from 'src/app/_models/entityModel';
import { Photo } from 'src/app/_models/photo';
import { Property } from 'src/app/_models/Property';
import { User } from 'src/app/_models/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit, OnChanges {



  @Input() property?: Property= undefined;
  @Input() agent?: Agent = undefined;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  photoList: Photo[];

  user: User;

  constructor(
    private accountService: AccountService, 
    private agentService: AgentsService,
    private propertyService: PropertiesService){
    this.accountService.currentUser$
    .pipe(take(1))
    .subscribe(user => this.user = user);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.property = this.property;
    this.photoList = this.property?.photos;
  }

  ngOnInit(){
    this.initializeUploader();

    if(this.agent === undefined){
      this.photoList = this.property.photos;
    }

    if(this.property === undefined){
      this.photoList = this.agent.photos;
    }
  }


  fileOverBase(event: any){
    this.hasBaseDropZoneOver = event;
  }

  initializeUploader(){

    if(this.agent !== undefined){
      this.uploader = new FileUploader({
        url: this.baseUrl + 'users/add-photo',
        authToken: 'Bearer '+ this.user.token,
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10*1024*1024
      });
    }

    if(this.property !== undefined){
      this.uploader = new FileUploader({
      
        url: this.baseUrl + 'properties/add-photo/'+this.property.id,
        authToken: 'Bearer '+ this.user.token,
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10*1024*1024
      });
    }
    

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {

      if(response){

        if(this.agent !== undefined){
          const photo: Photo = JSON.parse(response);
          this.agent.photos.push(photo);
          if(photo.isMain){
            this.user.photoUrl = photo.url;
            this.agent.photoUrl = photo.url;
            this.accountService.setCurrentUser(this.user);
          }
        }

        if(this.property !== undefined){

          const photo: Photo = JSON.parse(response);

          if(this.property.photos === null){

            let photos: Photo[] = [photo];
            this.property.photos = photos;
            this.photoList = this.property.photos;

          }else {
            this.property.photos.push(photo);
            this.photoList = this.property.photos;
          }


          if(photo.isMain){
            this.property.photoUrl = photo.url;
            this.accountService.setCurrentUser(this.user);
          }
        }
        
      }
    }
  }

  setMainPhoto(photo: Photo){


    if(this.agent !== undefined){
        this.agentService.setMainPhoto(photo.id).subscribe(() => {
        this.user.photoUrl = photo.url;
        this.accountService.setCurrentUser(this.user);
        this.agent.photoUrl = photo.url;
        this.agent.photos.forEach(p => {
          if(p.isMain)
            p.isMain = false;
          if(p.id === photo.id)
            p.isMain = true;
        })
      })
    }

    if(this.property !== undefined){
      this.propertyService.setMainPhoto(photo.id,this.property.id).subscribe(()=> {
        this.property.photoUrl = photo.url;
        this.property.photos.forEach(p => {
          if(p.isMain)
            p.isMain = false;
          if(p.id === photo.id)
            p.isMain = true;

        });
      });
    }

    
  }

  deletePhoto(photoId: number){

    if(this.agent !== undefined){
      this.agentService.deletePhoto(photoId).subscribe(() =>{
        this.photoList = this.agent.photos.filter(x => x.id !== photoId);
      });
    }

    if(this.property !==undefined)
    {
      this.propertyService.deletePhoto(photoId, this.property.id).subscribe(() => {
        this.photoList = this.property.photos.filter(x => x.id !== photoId);
      });
    }

   
  }

}
