export class Formatter {
  public static phoneFormat(v:string) : string {
    var format = v.replace('+7', '');
    if (v.indexOf('8') == 0)
      v = v.replace('8', '');
    format = format.replace(/\D/g, '');
    /*if (backspace) {
      if (this._lastValue.length > 0)
        this._password = this._lastValue.substring(0, this._lastValue.length - 1);
    } else {
      this._password = format;
    }*/

    /*if (this._password == this._lastValue && this._val != value)
     return;*/

    /*if (this._password.length > 10) {
      this._password = this._password.substring(0, 10);
    }*/

    //this._val = this._lastValue = this._password;

    if (format.length == 0) {
      format = '+7 ';
    } else if (format.length <= 3) {
      format = format.replace(/^(\d{0,3})/, '+7 ($1');
    } else if (format.length <= 6) {
      format = format.replace(/^(\d{0,3})(\d{0,3})/, '+7 ($1) $2');
    } else if (format.length <= 8) {
      format = format.replace(/^(\d{0,3})(\d{0,3})(\d{0,2})/, '+7 ($1) $2 - $3');
    } else {
      format = format.replace(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, '+7 ($1) $2 - $3 - $4');
    }
    return format;
  }
}
