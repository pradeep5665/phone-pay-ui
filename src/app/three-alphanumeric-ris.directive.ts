import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appThreeAlphanumericRis]'
})
export class ThreeAlphanumericRisDirective {
  private regex: RegExp = new RegExp(/^[a-zA-Z0-9]{0,2}$/g);
  
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [
    "Backspace",
    "Tab",
    "End",
    "Home",
    "ArrowLeft",
    "ArrowRight",
    "Del",
    "Delete"
  ];

  constructor(private el: ElementRef) {}
  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
   
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [
      current.slice(0, position),
      current.slice(position)
    ].join("");
    if (next && !String(next).match(this.regex)) {
     
      event.preventDefault();
    }
   
  }
}
