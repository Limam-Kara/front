import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnnexeComponent } from './detail-annexe.component';

describe('DetailAnnexeComponent', () => {
  let component: DetailAnnexeComponent;
  let fixture: ComponentFixture<DetailAnnexeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAnnexeComponent]
    });
    fixture = TestBed.createComponent(DetailAnnexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
