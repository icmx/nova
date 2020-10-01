import {
  Component,
  ViewChild,
  HostListener,
  OnInit,
  ElementRef,
  Input,
} from '@angular/core';

import { Mixin } from '../common/mixin/mixin';
import { Floater, FloaterPosition } from '../common/floater/floater';

@Component({
  selector: 'nova-menu',
  templateUrl: './nova-menu.component.html',
  styleUrls: ['./nova-menu.component.scss', '../common/floater/floater.scss'],
})
export class NovaMenuComponent implements OnInit, Floater {
  public _expanded: boolean;
  public _inside: boolean;

  @ViewChild('head', { static: false }) public head: ElementRef;
  @ViewChild('body', { static: false }) public body: ElementRef;

  public position: FloaterPosition = 'bottom';

  @HostListener('click') public _onClickInside: () => void;
  @HostListener('document:click') public _onClickOutside: () => void;

  public initAsFloater: () => void;
  public collapseBody: () => void;
  public collapseBodyAfterItemSelected: () => void;
  public expandBody: () => void;
  public toggleBody: () => void;
  public updateBodyPosition: () => void;

  @Input() direction: string = 'left';

  public ngOnInit() {
    Mixin.Apply(NovaMenuComponent, [Floater]);

    this.initAsFloater();
  }
}
