import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEndroitUComponent } from './detail-endroit-u.component';

describe('DetailEndroitUComponent', () => {
  let component: DetailEndroitUComponent;
  let fixture: ComponentFixture<DetailEndroitUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailEndroitUComponent]
    });
    fixture = TestBed.createComponent(DetailEndroitUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
