import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootAuthComponentComponent } from './root-auth-component.component';

describe('RootAuthComponentComponent', () => {
  let component: RootAuthComponentComponent;
  let fixture: ComponentFixture<RootAuthComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootAuthComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootAuthComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
