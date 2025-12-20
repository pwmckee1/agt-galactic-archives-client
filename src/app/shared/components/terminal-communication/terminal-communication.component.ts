import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'agt-terminal-communication',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal-communication.component.html',
  styleUrl: './terminal-communication.component.scss'
})
export class TerminalCommunicationComponent implements OnChanges {
  @Input({ required: true }) message: string = '';
  @Input() typingSpeed: number = 1; // Duration in seconds

  displayMessage: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      // Logic to restart animation if message changes
      this.displayMessage = this.message;
    }
  }

  get charCount(): number {
    return this.displayMessage.length;
  }
}
