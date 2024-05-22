import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEndroitUComponent } from './list-endroit-u.component';

describe('ListEndroitUComponent', () => {
  let component: ListEndroitUComponent;
  let fixture: ComponentFixture<ListEndroitUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEndroitUComponent]
    });
    fixture = TestBed.createComponent(ListEndroitUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
