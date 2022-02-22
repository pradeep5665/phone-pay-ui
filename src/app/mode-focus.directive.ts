import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[appModeFocus]'
})
export class ModeFocusDirective {

  @Input('focusNextBtn') isFocused: boolean;

    constructor(private hostElement: ElementRef, private renderer: Renderer) { }

    ngOnInit() {
        if (this.isFocused) {
            this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
        }
    }

}
