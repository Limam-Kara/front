import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDistrictComponent } from './update-district.component';

describe('UpdateDistrictComponent', () => {
  let component: UpdateDistrictComponent;
  let fixture: ComponentFixture<UpdateDistrictComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDistrictComponent]
    });
    fixture = TestBed.createComponent(UpdateDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
