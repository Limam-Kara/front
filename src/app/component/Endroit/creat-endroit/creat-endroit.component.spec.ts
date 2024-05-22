import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatEndroitComponent } from './creat-endroit.component';

describe('CreatEndroitComponent', () => {
  let component: CreatEndroitComponent;
  let fixture: ComponentFixture<CreatEndroitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatEndroitComponent]
    });
    fixture = TestBed.createComponent(CreatEndroitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
