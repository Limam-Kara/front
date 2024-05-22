import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEndroitComponent } from './detail-endroit.component';

describe('DetailEndroitComponent', () => {
  let component: DetailEndroitComponent;
  let fixture: ComponentFixture<DetailEndroitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailEndroitComponent]
    });
    fixture = TestBed.createComponent(DetailEndroitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
