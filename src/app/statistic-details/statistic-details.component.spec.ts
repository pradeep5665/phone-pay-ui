import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticDetailsComponent } from './statistic-details.component';

describe('StatisticDetailsComponent', () => {
  let component: StatisticDetailsComponent;
  let fixture: ComponentFixture<StatisticDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
