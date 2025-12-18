import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBaseComponent } from './player-base.component';

describe('PlayerBaseComponent', () => {
  let component: PlayerBaseComponent;
  let fixture: ComponentFixture<PlayerBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
