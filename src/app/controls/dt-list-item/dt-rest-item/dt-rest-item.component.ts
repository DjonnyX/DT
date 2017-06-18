import { Component, Input } from '@angular/core';

@Component({
  selector: 'dt-rest-item',
  styleUrls: ['./dt-rest-item.component.scss'],
  templateUrl : './dt-rest-item.component.html'
})

export class DtRestItemComponent {

  private _id:string = '';
  @Input()
  public set id(v:string) {
    if (this._id != v)
      this._id = v;
  }
  public get id() : string {
    return this._id;
  }

  private _name:string = '';
  @Input()
  public set name(v:string) {
    if (this._name != v)
      this._name = v;
  }
  public get name() : string {
    return this._name;
  }

  private _address:string = '';
  @Input()
  public set address(v:string) {
    if (this._address != v)
      this._address = v;
  }
  public get address() : string {
    return this._address;
  }

  private _url:string = '';
  @Input()
  public set url(v:string) {
    if (this._url != v)
      this._url = v;
  }
  public get url() : string {
    return this._url;
  }

  private _bought:boolean = false;
  @Input()
  public set bought(v:boolean) {
    if (this._bought != v)
      this._bought = v;
  }
  public get bought() : boolean {
    return this._bought;
  }

  private _color:string = '#000';
  @Input()
  public set color(v:string) {
    if (this._color != v)
      this._color = v;
  }
  public get color() : string {
    return this._color;
  }

  private _data: {name:string, address:string, id:string, color:string};
  @Input('data')
  public get data() { return this._data; }
  public set data(value) {
    if (this._data != value) {
      this._data = value;
      if (this._data != null) {
        this.id = this._data.id;
        this.name = this._data.name;
        this.color = this._data.color;
        this.address = this._data.address;
      }
    }
  }

  constructor() {}
}
