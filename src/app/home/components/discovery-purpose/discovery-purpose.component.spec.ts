import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryPurposeComponent } from './discovery-purpose.component';

describe('DiscoveryPurposeComponent', () => {
  let component: DiscoveryPurposeComponent;
  let fixture: ComponentFixture<DiscoveryPurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoveryPurposeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscoveryPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
