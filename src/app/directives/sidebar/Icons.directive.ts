import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appIcons]',
})
export class IconsDirective implements OnInit {
  @Input('appIcons') iconData: { dataIcon: string; dataFlip: string } = {
    dataIcon: '',
    dataFlip: '',
  };
  @HostBinding('attr.data-icon') dataIcon: string = this.iconData.dataIcon;
  @HostBinding('attr.data-flip') dataFlip: string = this.iconData.dataIcon;

  constructor() {}

  ngOnInit(): void {
    this.dataIcon = this.iconData.dataIcon;
    this.dataFlip = this.iconData.dataFlip;
  }
}
