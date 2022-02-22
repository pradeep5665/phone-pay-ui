import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[appFocusEmailInputbox]'
})
export class FocusEmailInputboxDirective {

  @Input('focuMe') isFocused: boolean;

    constructor(private hostElement: ElementRef, private renderer: Renderer) { }

    ngOnInit() {
        if (this.isFocused) {
            this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
        }
    }
}
