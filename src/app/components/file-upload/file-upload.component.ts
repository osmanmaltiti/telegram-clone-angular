import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit, OnChanges {
  @Output('cancelUpload') cancel: EventEmitter<any> = new EventEmitter();
  @Input('openFileDialog') open: boolean = false;
  @Input('file') file: any;

  imageUrl: string = '';
  caption: string = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.onGetPreview();
  }

  ngOnInit(): void {}

  onGetPreview() {
    if (!this.file) return;

    this.imageUrl = URL.createObjectURL(this.file);
  }

  onSubmit() {
    console.log(this.caption);
    console.log(this.file);
  }

  onCancel() {
    this.cancel.emit();
  }
}
