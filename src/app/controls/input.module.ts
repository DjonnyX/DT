import { Directive, ElementRef, Renderer } from '@angular/core';
import { NgControl} from "@angular/forms";

@Directive({
  selector: '[ngModel][phone]',
  host: {
    '(ngModelChange)': 'onInputChange($event)'
  }
})
export class PhoneMask {

  constructor(public model: NgControl) {
  }

  private _lastValue:String = '';
  private _password:String = '';
  private _val:String;

  onInputChange(value, backspace) {
    var format = value.replace('+7', '');
    format = format.replace(/\D/g, '');
    if (backspace) {
      if (this._lastValue.length > 0)
        this._password = this._lastValue.substring(0, this._lastValue.length - 1);
    } else {
      this._password = format;
    }

    /*if (this._password == this._lastValue && this._val != value)
      return;*/

    if (this._password.length > 10) {
      this._password = this._password.substring(0, 10);
    }

    this._val = this._lastValue = this._password;

    if (this._val.length == 0) {
      this._val = '+7 ';
    } else if (this._val.length <= 3) {
      this._val = this._val.replace(/^(\d{0,3})/, '+7 ($1');
    } else if (this._val.length <= 6) {
      this._val = this._val.replace(/^(\d{0,3})(\d{0,3})/, '+7 ($1) $2');
    } else if (this._val.length <= 8) {
      this._val = this._val.replace(/^(\d{0,3})(\d{0,3})(\d{0,2})/, '+7 ($1) $2 - $3');
    } else {
      this._val = this._val.replace(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, '+7 ($1) $2 - $3 - $4');
    }

    setTimeout(function(acessor, v) {
        acessor.writeValue(v);
    }, 1,
    this.model.valueAccessor, this._val);
  }
}
export class InputModule {
  constructor() {
  }
}
