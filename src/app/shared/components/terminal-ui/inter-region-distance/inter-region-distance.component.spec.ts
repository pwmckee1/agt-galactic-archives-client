import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterRegionDistanceComponent } from './inter-region-distance.component';

describe('InterRegionDistanceComponent', () => {
  let component: InterRegionDistanceComponent;
  let fixture: ComponentFixture<InterRegionDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterRegionDistanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterRegionDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
