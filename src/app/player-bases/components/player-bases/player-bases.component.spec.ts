import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBasesComponent } from './player-bases.component';

describe('PlayerBasesComponent', () => {
  let component: PlayerBasesComponent;
  let fixture: ComponentFixture<PlayerBasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerBasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerBasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
