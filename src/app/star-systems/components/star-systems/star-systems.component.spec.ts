import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarSystemsComponent } from './star-systems.component';

describe('StarSystemsComponent', () => {
  let component: StarSystemsComponent;
  let fixture: ComponentFixture<StarSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarSystemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
