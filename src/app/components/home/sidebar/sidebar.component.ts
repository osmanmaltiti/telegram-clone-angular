import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IIcons, SiderbarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  buttons: Array<IIcons> | undefined;
  hide: boolean = false;
  @Input('open') open: boolean = false;
  @Output('close_sidebar') close: EventEmitter<any> = new EventEmitter();

  constructor(private siderbarService: SiderbarService) {}

  ngOnInit(): void {
    this.buttons = this.siderbarService.button;
  }

  onShow() {
    this.hide = !this.hide;
  }

  onClose() {
    this.close.emit();
  }
}
