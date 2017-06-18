import { Component, trigger, state, style, transition, animate, EventEmitter, Input, Output, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'dt-tabbar',
  styleUrls: ['./dt-tabbar.component.scss'],
  templateUrl : './dt-tabbar.component.html'
})

export class DtTabbarComponent {

  private _length:number = 0;

  public styleWidth:any;

  public get length() : number {
    return this._length;
  }

  private _selectedItem : DtTabbarItemModel;

  public items:Array<DtTabbarItemModel> = [];

  private _data: Array<{name:string, route:string}>;
  @Input('data')
  public get data() { return this._data; }
  public set data(value) {
    if (this._data != value) {
      this._data = value;
      this.create();
    }
  }

  /**
   * Эмиттор события инициализации модели
   * @type {EventEmitter<Array<DtTabbarItemModel>>}
   */
  @Output()
  changeItem:EventEmitter<DtTabbarItemModel> = new EventEmitter<DtTabbarItemModel>();

  constructor(private _element:Renderer) {}

  private create() : void {
    this._length = this.data.length;
    this.styleWidth = {'width':String(100 / this._length) + '%'}

    for (var i:number = 0; i < this._length; i ++ ) {
      var itemModel:any = this.data[i];
      var item:DtTabbarItemModel = new DtTabbarItemModel(i, this._length, this.data[i].name, this.data[i].route);
      this.items.push(item);
    }
    if (this.items.length > 0)
      this.select(this.items[0]);
  }

  public select(item:DtTabbarItemModel) : DtTabbarItemModel {
    if (this._selectedItem != item) {
      var lastSelectedItem: DtTabbarItemModel = this._selectedItem;
      this._selectedItem = item;
      item.selected = true;
      if (lastSelectedItem != null) {
        lastSelectedItem.selected = false;
        lastSelectedItem = null;
      }
    }
    this._tabIndex = item.index;
    this.changeItem.emit(item);
    return item;
  }

  private _tabIndex: number;
  @Input('tabIndex')
  public get tabIndex() { return this._tabIndex; }
  public set tabIndex(v) {
    if (this._tabIndex != v) {
      var item:DtTabbarItemModel = this.items.length > v ? this.items[v] : null;
      if (item != null)
        this.select(item);
    }
  }
}

export class DtTabbarItemModel {

  private static LEFT:String = 'left';
  private static RIGHT:String = 'right';
  private static CENTER:String = 'center';

  /**
   * @private
   */
  private _classes:String = ''
  /**
   * возвращает css классы
   * @returns {String}
   */
  public get classes() : String {
    return this._classes;
  }
  /**
   * @private
   */
  private _selected:Boolean = false;

  /**
   * Возвращает "true", если элемент выбран
   * @type {boolean}
   */
  public get selected() : Boolean {
    return this._selected;
  }

  /**
   * Устанавливает элемент в выбранное состояние
   * @type {boolean}
   */
  public set selected(v:Boolean) {
    if (this._selected != v) {
      this._selected = v;
      this.updateClasses();
    }
  }

  private _type:String;

  /**
   * Тип расположения элемента.
   * Доступны 'left', 'right' и 'center'
   * @returns {String}
   */
  public get type() : String {
    return this.type;
  }

  /**
   * Возвращает порядковый индекс
   * @returns {number}
   */
  public get index() : number {
    return this._index;
  }

  /**
   * Возвращает имя
   * @returns {string}
   */
  public get name() : string {
    return this._name;
  }

  /**
   * Возвращает маршрут
   * @returns {string}
   */
  public get route() : string {
    return this._route;
  }

  constructor(private _index:number,
              private _length:number,
              private _name:string,
              private _route:string) {
    if (_length > 1) {
      if (_index == 0)
        this._type = DtTabbarItemModel.LEFT;
      else if (_index == _length - 1)
        this._type = DtTabbarItemModel.RIGHT;
      else
        this._type = DtTabbarItemModel.CENTER;
    } else
      this._type = DtTabbarItemModel.LEFT;
    this.updateClasses();
  }

  private updateClasses() : void {
    this._classes = 'dt-tabbar__button ';
    if (this._selected)
      this._classes += 'selected ';
    switch (this._type) {
      case DtTabbarItemModel.LEFT:
        this._classes += 'dt-tabbar__left-button ';
        break;
      case DtTabbarItemModel.RIGHT:
        this._classes += 'dt-tabbar__right-button ';
        break;
      case DtTabbarItemModel.CENTER:
        this._classes += 'dt-tabbar__center-button ';
        break;
    }
  }
}
