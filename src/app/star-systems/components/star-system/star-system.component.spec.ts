import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarSystemComponent } from './star-system.component';

describe('StarSystemComponent', () => {
  let component: StarSystemComponent;
  let fixture: ComponentFixture<StarSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
