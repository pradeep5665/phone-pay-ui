import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentAdviceListComponent } from './admin-payment-advice-list.component';

describe('AdminPaymentAdviceListComponent', () => {
  let component: AdminPaymentAdviceListComponent;
  let fixture: ComponentFixture<AdminPaymentAdviceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentAdviceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentAdviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
