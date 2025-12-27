import { Component, Input } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { ProgressBarModule } from 'primeng/progressbar';

import { formatFileSize } from '@shared/helpers/general-helpers';

@Component({
  selector: 'agt-terminal-image-upload',
  imports: [
    ButtonModule,
    FileUploadModule,
    ImageModule,
    ProgressBarModule
  ],
  templateUrl: './terminal-image-upload.component.html',
  styleUrl: './terminal-image-upload.component.scss',
})
export class TerminalImageUploadComponent {
  @Input() title: string = '';
  @Input() maxFileSize: number = 0;
  @Input() exampleImage: string = '';

  files: any[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;

  onSelectedFiles(event: any) {
    this.totalSize = 0;
    this.files = event.currentFiles;
    this.files.forEach((file) => {
      this.totalSize += parseInt(file.size);
    });
    this.totalSizePercent = (this.totalSize / this.maxFileSize) * 100;
  }

  chooseImage(callback: any) {
    callback();
  }

  formatFileSize(bytes: number): string {
    return formatFileSize(bytes);
  }

  onRemoveTemplatingFile(event: any, file: any, removeFileCallback: any, index: number) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(file.size);
    this.totalSizePercent = (this.totalSize / this.maxFileSize) * 100;
  }
}
