import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appValidateStateandcity]'
})
export class ValidateStateandcityDirective {

  private regex: RegExp = new RegExp(/^[a-zA-Z\s-]+$/g);
 // public emailVal:boolean;
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
    alert("next :: "+next);
    if (next && !String(next).match(this.regex) && (event.keyCode > 64 )) {
      event.preventDefault();
    }
   
  }
}