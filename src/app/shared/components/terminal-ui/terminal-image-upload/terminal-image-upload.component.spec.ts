import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalImageUploadComponent } from './terminal-image-upload.component';

describe('TerminalImageUploadComponent', () => {
  let component: TerminalImageUploadComponent;
  let fixture: ComponentFixture<TerminalImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalImageUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminalImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
