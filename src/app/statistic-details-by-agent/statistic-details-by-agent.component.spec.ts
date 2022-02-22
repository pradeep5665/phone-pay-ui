import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticDetailsByAgentComponent } from './statistic-details-by-agent.component';

describe('StatisticDetailsByAgentComponent', () => {
  let component: StatisticDetailsByAgentComponent;
  let fixture: ComponentFixture<StatisticDetailsByAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticDetailsByAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticDetailsByAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
