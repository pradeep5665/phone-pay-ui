import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRequestDisabledComponent } from './check-request-disabled.component';

describe('CheckRequestDisabledComponent', () => {
  let component: CheckRequestDisabledComponent;
  let fixture: ComponentFixture<CheckRequestDisabledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckRequestDisabledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckRequestDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
