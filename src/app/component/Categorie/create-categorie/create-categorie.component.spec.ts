import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategorieComponent } from './create-categorie.component';

describe('CreateCategorieComponent', () => {
  let component: CreateCategorieComponent;
  let fixture: ComponentFixture<CreateCategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCategorieComponent]
    });
    fixture = TestBed.createComponent(CreateCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
