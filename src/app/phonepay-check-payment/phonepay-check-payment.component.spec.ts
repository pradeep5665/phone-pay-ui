import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonepayCheckPaymentComponent } from './phonepay-check-payment.component';

describe('PhonepayCheckPaymentComponent', () => {
  let component: PhonepayCheckPaymentComponent;
  let fixture: ComponentFixture<PhonepayCheckPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonepayCheckPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonepayCheckPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
