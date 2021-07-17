import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprtyUploadComponent } from './proprty-upload.component';

describe('ProprtyUploadComponent', () => {
  let component: ProprtyUploadComponent;
  let fixture: ComponentFixture<ProprtyUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprtyUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprtyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
