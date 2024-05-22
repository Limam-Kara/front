import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnexeComponent } from './create-annexe.component';

describe('CreateAnnexeComponent', () => {
  let component: CreateAnnexeComponent;
  let fixture: ComponentFixture<CreateAnnexeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAnnexeComponent]
    });
    fixture = TestBed.createComponent(CreateAnnexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
