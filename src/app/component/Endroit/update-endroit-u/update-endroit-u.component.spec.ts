import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEndroitUComponent } from './update-endroit-u.component';

describe('UpdateEndroitUComponent', () => {
  let component: UpdateEndroitUComponent;
  let fixture: ComponentFixture<UpdateEndroitUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEndroitUComponent]
    });
    fixture = TestBed.createComponent(UpdateEndroitUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
