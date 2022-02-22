import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchPaymentDetailsComponent } from './research-payment-details.component';

describe('ResearchPaymentDetailsComponent', () => {
  let component: ResearchPaymentDetailsComponent;
  let fixture: ComponentFixture<ResearchPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
