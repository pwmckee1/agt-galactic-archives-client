import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaunasComponent } from './faunas.component';

describe('FaunasComponent', () => {
  let component: FaunasComponent;
  let fixture: ComponentFixture<FaunasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaunasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
