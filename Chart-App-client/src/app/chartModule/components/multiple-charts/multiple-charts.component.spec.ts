import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChartsComponent } from './multiple-charts.component';

describe('MultipleChartsComponent', () => {
  let component: MultipleChartsComponent;
  let fixture: ComponentFixture<MultipleChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
