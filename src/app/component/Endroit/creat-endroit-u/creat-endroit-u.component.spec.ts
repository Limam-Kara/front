import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatEndroitUComponent } from './creat-endroit-u.component';

describe('CreatEndroitUComponent', () => {
  let component: CreatEndroitUComponent;
  let fixture: ComponentFixture<CreatEndroitUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatEndroitUComponent]
    });
    fixture = TestBed.createComponent(CreatEndroitUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
