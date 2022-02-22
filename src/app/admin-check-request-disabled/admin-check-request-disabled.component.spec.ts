import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCheckRequestDisabledComponent } from './admin-check-request-disabled.component';

describe('AdminCheckRequestDisabledComponent', () => {
  let component: AdminCheckRequestDisabledComponent;
  let fixture: ComponentFixture<AdminCheckRequestDisabledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCheckRequestDisabledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCheckRequestDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
