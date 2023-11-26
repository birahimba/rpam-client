import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFixedNavbar]',
})
export class FixedNavbarDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (scrollY > 0) {
      this.renderer.addClass(this.el.nativeElement, 'fixed');
      this.renderer.addClass(this.el.nativeElement, 'shadow-bottom');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'fixed');
      this.renderer.removeClass(this.el.nativeElement, 'shadow-bottom');
    }
  }
}
