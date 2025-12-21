import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommunicationComponent } from './terminal-communication.component';

describe('TerminalCommunicationComponent', () => {
  let component: TerminalCommunicationComponent;
  let fixture: ComponentFixture<TerminalCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalCommunicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminalCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
