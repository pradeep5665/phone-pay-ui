import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsInProcessComponent } from './payments-in-process.component';

describe('PaymentsInProcessComponent', () => {
  let component: PaymentsInProcessComponent;
  let fixture: ComponentFixture<PaymentsInProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsInProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
