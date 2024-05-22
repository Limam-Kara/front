import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEndroitComponent } from './list-endroit.component';

describe('ListEndroitComponent', () => {
  let component: ListEndroitComponent;
  let fixture: ComponentFixture<ListEndroitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEndroitComponent]
    });
    fixture = TestBed.createComponent(ListEndroitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
