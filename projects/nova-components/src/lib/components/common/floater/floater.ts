import { ElementRef } from '@angular/core';

const TIMING_INITIAL: number = 100;
const TIMING_SELECTION: number = 1;
const EVENT_SCROLL: string = 'scroll';
const EVENT_RESIZE: string = 'resize';
const WIDTH_UNIT: string = 'px';

export type FloaterPosition = 'top' | 'bottom';

export class Floater {
  public _expanded: boolean = false;
  public _inside: boolean = false;

  public head: ElementRef;
  public body: ElementRef;

  public position: FloaterPosition = 'bottom';

  public _onClickInside(): void {
    this._inside = true;
  }

  public _onClickOutside(): void {
    if (this._inside) {
      this.expandBody();
    } else {
      this.collapseBody();
    }

    this._inside = false;
  }

  public initAsFloater(): void {
    setTimeout(() => {
      this.updateBodyPosition();
    }, TIMING_INITIAL);
  }

  public collapseBody(): void {
    this.updateBodyPosition();
    this._expanded = false;

    window.removeEventListener(EVENT_SCROLL, () => {
      this.updateBodyPosition();
    });
    window.removeEventListener(EVENT_RESIZE, () => {
      this.updateBodyPosition();
    });
  }

  public collapseBodyAfterItemSelected(): void {
    setTimeout(() => {
      this.collapseBody();
    }, TIMING_SELECTION);
  }

  public expandBody(): void {
    this.updateBodyPosition();
    this._expanded = true;

    window.addEventListener(EVENT_SCROLL, () => {
      this.updateBodyPosition();
    });
    window.addEventListener(EVENT_RESIZE, () => {
      this.updateBodyPosition();
    });
  }

  public toggleBody(): void {
    if (this._expanded) {
      this.collapseBody();
    } else {
      this.expandBody();
    }
  }

  public updateBodyPosition(): void {
    const headBCR: any = this.head.nativeElement.getBoundingClientRect();
    const bodyBCR: any = this.body.nativeElement.getBoundingClientRect();

    // I'm sorry but I can't maintain this anymore
    // this.body.nativeElement.style.top = `${headBCR.top +
    //   headBCR.height}${WIDTH_UNIT}`;
    // this.body.nativeElement.style.left = `${headBCR.left}${WIDTH_UNIT}`;
  }
}
