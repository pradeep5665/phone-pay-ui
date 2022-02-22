import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAdviseComponent } from './payment-advise.component';

describe('PaymentAdviseComponent', () => {
  let component: PaymentAdviseComponent;
  let fixture: ComponentFixture<PaymentAdviseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentAdviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAdviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
