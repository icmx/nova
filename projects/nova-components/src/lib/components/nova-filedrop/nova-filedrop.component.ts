import {
  Component,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'nova-filedrop',
  templateUrl: './nova-filedrop.component.html',
  styleUrls: ['./nova-filedrop.component.scss'],
})
export class NovaFiledropComponent {
  @Input()
  public name: string = null;

  @Input()
  public accept: string = null;

  @Input()
  public multiple: boolean = false;

  @Input()
  public buttonText: string = 'Choose file';

  @Input()
  public zoneText: string = 'Drop file here';

  @Input()
  public fileText: string = 'No file chosen.';

  @Output()
  public changed: EventEmitter<FileList> = new EventEmitter<FileList>();
  public get files(): FileList {
    return this._input.nativeElement.files;
  }
  public set files(value: FileList) {
    this._input.nativeElement.files = value;
  }

  public get expanded(): boolean {
    return this._expanded;
  }

  @ViewChild('input', { static: false })
  private _input: ElementRef;
  private _expanded: boolean = false;

  public updateValue(event): void {
    this.changed.emit(this.files);
    this.fileText = this._getFileText();
    this._preventAndStop(event);
  }

  @HostListener('click', ['$event'])
  public onclick(event: any): void {
    this._input.nativeElement.click();
  }

  @HostListener('drop', ['$event'])
  public ondrop(event: any): void {
    this._expanded = false;

    let files: any = event.dataTransfer.files; // tslint:disable-line

    if (!this.multiple && files.length > 1) {
      // TODO: make sure that user got this issue
    } else {
      this.files = files;
    }

    this._input.nativeElement.dispatchEvent(new Event('change'));
    this._preventAndStop(event);
  }

  @HostListener('document:drop', ['$event'])
  public ondocumentdrop(event: any): void {
    this._expanded = false;
    this._preventAndStop(event);
  }

  @HostListener('document:dragover', ['$event'])
  public ondocumentdragover(event: any): void {
    this._expanded = true;
    this._preventAndStop(event);
  }

  @HostListener('document:dragleave', ['$event'])
  public ondocumentdragleave(event: any): void {
    this._expanded = false;
    this._preventAndStop(event);
  }

  private _getFileText(): string {
    switch (this.files.length) {
      case 0:
        return 'Файл не выбран';
      case 1:
        return `${this.files[0].name}`;
      default:
        return `${this.files[0].name}, ... (+${this.files.length - 1}) `;
    }
  }

  private _preventAndStop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
