import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonepayPaymentsComponent } from './phonepay-payments.component';

describe('PhonepayPaymentsComponent', () => {
  let component: PhonepayPaymentsComponent;
  let fixture: ComponentFixture<PhonepayPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonepayPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonepayPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
