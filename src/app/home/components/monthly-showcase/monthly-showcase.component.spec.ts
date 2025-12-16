import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyShowcaseComponent } from './monthly-showcase.component';

describe('MonthlyShowcaseComponent', () => {
  let component: MonthlyShowcaseComponent;
  let fixture: ComponentFixture<MonthlyShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyShowcaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
