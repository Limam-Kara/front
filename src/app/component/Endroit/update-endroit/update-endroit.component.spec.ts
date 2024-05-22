import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEndroitComponent } from './update-endroit.component';

describe('UpdateEndroitComponent', () => {
  let component: UpdateEndroitComponent;
  let fixture: ComponentFixture<UpdateEndroitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEndroitComponent]
    });
    fixture = TestBed.createComponent(UpdateEndroitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
