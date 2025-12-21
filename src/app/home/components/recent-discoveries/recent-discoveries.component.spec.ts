import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentDiscoveriesComponent } from './recent-discoveries.component';

describe('RecentDiscoveriesComponent', () => {
  let component: RecentDiscoveriesComponent;
  let fixture: ComponentFixture<RecentDiscoveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentDiscoveriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentDiscoveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
