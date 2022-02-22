import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appValidateEmail]'
})
export class ValidateEmailDirective { 

  private regex: RegExp = new RegExp(/^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z0-9?]+\.[0-9?A-z]{1,3}$/g);
  public emailVal:boolean;
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
     this.emailVal = false;
     
      event.preventDefault();
    }
   
  }
}
