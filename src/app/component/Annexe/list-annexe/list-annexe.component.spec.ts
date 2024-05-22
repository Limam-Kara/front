import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnnexeComponent } from './list-annexe.component';

describe('ListAnnexeComponent', () => {
  let component: ListAnnexeComponent;
  let fixture: ComponentFixture<ListAnnexeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAnnexeComponent]
    });
    fixture = TestBed.createComponent(ListAnnexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
