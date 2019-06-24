import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdevotionComponent } from './newdevotion.component';

describe('NewdevotionComponent', () => {
  let component: NewdevotionComponent;
  let fixture: ComponentFixture<NewdevotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdevotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdevotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
