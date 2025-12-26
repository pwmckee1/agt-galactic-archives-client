import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Typed from 'typed.js';

@Component({
  selector: 'agt-terminal-communication',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal-communication.component.html',
  styleUrl: './terminal-communication.component.scss'
})
export class TerminalCommunicationComponent implements OnInit, OnChanges, OnDestroy {
  @Input({ required: true }) message: string = '';
  @Input() typingSpeed: number = 10; // typed.js uses ms per character (lower is faster)
  @Input() success: boolean = true;
  @Input() hideCursor: boolean = true;

  @Output() typingDone = new EventEmitter<boolean>();

  @ViewChild('typedElement', { static: true }) typedElement!: ElementRef;

  private typed: Typed | undefined;
  textColorClass: string = '';
  isFinished: boolean = false;

  ngOnInit(): void {
    this.textColorClass = this.success ? 'text-green' : 'text-secondary';
    this.initTyped();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.textColorClass = this.success ? 'text-green' : 'text-secondary';
    if (changes['message'] && !changes['message'].firstChange) {
      this.initTyped();
    }

    if (changes['hideCursor']) {
      this.updateCursorVisibility();
    }
  }

  private initTyped(): void {
    this.isFinished = false;
    if (this.typed) {
      this.typed.destroy();
    }

    const options = {
      strings: [this.message],
      typeSpeed: this.typingSpeed,
      showCursor: true, // Always true so the element is created
      cursorChar: '_',
      onComplete: (self: Typed) => {
        this.isFinished = true;
        this.updateCursorVisibility(); // Apply visibility state on complete
        this.typingDone.emit(true);
      }
    };

    this.typed = new Typed(this.typedElement.nativeElement, options);
  }

  private updateCursorVisibility(): void {
    if (this.typed && this.typed.cursor) {
      this.typed.cursor.style.visibility = this.hideCursor ? 'hidden' : 'visible';
    }
  }

  ngOnDestroy(): void {
    if (this.typed) {
      this.typed.destroy();
    }
  }
}
