import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdevotionComponent } from './editdevotion.component';

describe('EditdevotionComponent', () => {
  let component: EditdevotionComponent;
  let fixture: ComponentFixture<EditdevotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdevotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdevotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
