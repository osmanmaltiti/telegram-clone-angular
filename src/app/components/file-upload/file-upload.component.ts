import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { MutationService } from './service/mutation.service';
import { UploadService } from './service/upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit, OnChanges {
  @Output('cancelUpload') cancel: EventEmitter<any> = new EventEmitter();
  @Input('openFileDialog') open: boolean = false;
  @Input('file') file: any;
  @Input('chat') chat: any;

  imageUrl: string = '';
  caption: string = '';
  filePath: string = '';

  constructor(
    private mutationService: MutationService,
    private uploadService: UploadService
  ) {}

  ngOnChanges(): void {
    this.onGetPreview();
  }

  ngOnInit(): void {}

  onGetPreview() {
    if (!this.file) return;

    this.imageUrl = URL.createObjectURL(this.file);

    this.uploadService.onUpload(this.file).subscribe({
      next: ({ data }) => (this.filePath = data),
    });
  }

  onSubmit() {
    const id = String(localStorage.getItem('id'));

    const message = {
      from: id,
      file: this.filePath,
      chatId: this.chat.id,
      message: this.caption,
      combinedUserIds: this.chat.combinedUserIds,
    };

    this.mutationService.mutate({ message }).subscribe({
      next: () => {
        this.cancel.emit();
      },
    });

    this.caption = '';
  }

  onCancel() {
    this.cancel.emit();
  }
}
