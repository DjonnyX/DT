import { Component, Input } from '@angular/core';

@Component({
  selector: 'dt-module-card',
  styleUrls: ['./dt-module-card.component.scss'],
  templateUrl : './dt-module-card.component.html'
})

export class DtModuleCardComponent {

  private _title:string = '';
  @Input()
  public set title(v:string) {
    if (this._title != v)
      this._title = v;
  }
  public get title() : string {
    return this._title;
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

  private _description:string = '';
  @Input()
  public set description(v:string) {
    if (this._description != v)
      this._description = v;
  }
  public get description() : string {
    return this._description;
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

  private _data: {name:string, description:string, bought:boolean, url:string};
  @Input('data')
  public get data() { return this._data; }
  public set data(value) {
    if (this._data != value) {
      this._data = value;
      if (this._data != null) {
        this.name = this._data.name;
        this.description = this._data.description;
        this.bought = this._data.bought;
        this.url = this._data.url;
      }
    }
  }

  constructor() {}
}
