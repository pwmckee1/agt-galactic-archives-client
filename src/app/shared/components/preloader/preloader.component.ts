import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  TerminalCommunicationComponent
} from '@shared/components/terminal-ui/terminal-communication/terminal-communication.component';
import { Image } from 'primeng/image';

@Component({
  selector: 'agt-preloader',
  standalone: true,
  imports: [
    NgClass,
    TerminalCommunicationComponent,
    Image
  ],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss',
})
export class PreloaderComponent implements OnInit {
  ONE_MINUTE_IN_MILLISECONDS: number = 60000;
  @Input() isError: boolean;
  @Input() timeoutMillis: number | null = this.ONE_MINUTE_IN_MILLISECONDS;
  @Input() errorMessage: string = 'Something Went Wrong';
  @Input() responsive: boolean = false;
  @Input() spinnerHeight: string = '200';
  @Input() spinnerWidth: string = '200';
  @Output() hasTimedOut: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    if (this.timeoutMillis) {
      this.startTimeoutCounter();
    }
  }

  startTimeoutCounter() {
    setTimeout(() => {
      this.isError = true;
      this.hasTimedOut.emit();
    }, this.timeoutMillis || 0);
  }
}
