import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingoverviewComponent } from './trainingoverview.component';

describe('TrainingoverviewComponent', () => {
  let component: TrainingoverviewComponent;
  let fixture: ComponentFixture<TrainingoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
