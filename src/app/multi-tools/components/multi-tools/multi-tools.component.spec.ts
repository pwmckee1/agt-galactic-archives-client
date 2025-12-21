import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiToolsComponent } from './multi-tools.component';

describe('MultiToolsComponent', () => {
  let component: MultiToolsComponent;
  let fixture: ComponentFixture<MultiToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiToolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
