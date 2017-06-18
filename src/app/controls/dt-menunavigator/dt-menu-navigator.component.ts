import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'dt-menu-navigator',
  templateUrl: './dt-menu-navigator.component.html',
  styleUrls: ['./dt-menu-navigator.component.scss']
})

/**
 * Навигатор меню
 */
export class DtMenuNavigatorComponent {

  private _index:number = -1;

  @Input('index')

  /**
   * Возвращает индекс родителя
   * @returns {Number}
   */
  public get index() : number {
    return this._index;
  }

  /**
   * Задает индекс родителя.
   * @type {Number}
   */
  public set index(v:number) {
    if (this._index != v) {
      this._index = v;

      // Устанавливается вложенная принадлежность элемента
      if (this._index > -1) {
        this._isSub = true;

        // Устанавливается класс вложенной принадлежности элемента
        this.el.classList.add('sub');
      }
    }
  }
  /**
   * @type {DtMenuNavigatorProvider}
   * @private
   */
  private _provider:DtMenuNavigatorProvider;

  @Input('provider')
  /**
   * Возвращает провайдер
   * @returns {DtMenuNavigatorProvider}
   */
  public get provider() : DtMenuNavigatorProvider {
    return this._provider;
  }
  /**
   * Устанавливает провайдер
   * @returns {DtMenuNavigatorProvider}
   */
  public set provider(v:DtMenuNavigatorProvider) {
    if (this._provider != v) {
      this._provider = v;
    }
  }

  /**
   * Эмиттор события инициализации модели
   * @type {EventEmitter<Array<DtMenuNavigatorItemModel>>}
   */
  @Output()
  public changeItem:EventEmitter<DtMenuNavigatorItemModel> = new EventEmitter<DtMenuNavigatorItemModel>();

  /**
   * @type {boolean}
   * @private
   */
  private _isSub:Boolean = false;

  public get isSub() : Boolean {
    return this._isSub;
  }

  /**
   * Возвращает true, если модель является "ребенком"
   */

  private _parentItem:DtMenuNavigatorItemModel;
  @Input('parentItem')
  public get parentItem() { return this._parentItem; }
  public set parentItem(value:DtMenuNavigatorItemModel) {
    if (this._parentItem != value)
      this._parentItem = value;
  }

  private _data:Array<StateData> = null;
  @Input('data')
  public get data() : Array<StateData> {
    return this._data;
  }

  public set data(value:Array<StateData>) {
    this._data = value;
    if (this._data != null)
      this.create();
  }

  private _active:Boolean = false;
  @Input('active')
  public get active() { return this._active; }
  public set active(value) {
    if (this._active != value)
      this._active = value;
  }

  public menuItems:Array<DtMenuNavigatorItemModel> = [];

  private el:HTMLElement;

  constructor(private elRef: ElementRef) {
    this.el = elRef.nativeElement;

    // Создается провайдер
    if (this._provider == null)
      this._provider = new DtMenuNavigatorProvider();
  }

  /**
   * Возвращает true, если элемент является частью "цепи"
   * @param item
   * @returns {boolean}
   */
  public isOpened(item:DtMenuNavigatorItemModel) : Boolean {
    var selectedItem:DtMenuNavigatorItemModel = this.provider.selectedItem;
    if (selectedItem == item)
      return true;
    if (selectedItem != null && item.children != null) {
      if (item.children.indexOf(selectedItem) > -1)
        return true;
    }
    return false;
  }

  /**
   * Создает модель элементов
   */
  private create() : void {
    for (var i:number = 0; i < this.data.length; i ++ ) {
      var itemModel:StateData = this.data[i];
      var item:DtMenuNavigatorItemModel = new DtMenuNavigatorItemModel(this, this._index, i, this.data[i].name, this.data[i].route);
      if (!this._isSub)
        item.childrenData = itemModel.children;
      this.menuItems.push(item);
    }
    this._provider.setupChildrenFor(this._index, this.menuItems);
    // Нужно установить навигатор для корневого элемента
    if (!this._isSub)
      this._provider.rootItem.navigator = this;
  }

  public onChangeSub(item:DtMenuNavigatorItemModel) : void {
    this.changeItem.emit(item);
  }

  /**
   * Выделяет запрошенный элемент
   * @param item {DtMenuNavigatorItemModel}
   * @returns {DtMenuNavigatorItemModel}
   */
  public select(item:DtMenuNavigatorItemModel) : DtMenuNavigatorItemModel {
    this._provider.select(item);
    return item;
  }
}

/**
 * Модель элемента навигации
 */
export class DtMenuNavigatorItemModel {

  private _isExpanded:Boolean = false;

  public get isExpanded() : Boolean {
    return this._isExpanded;
  }

  public set isExpanded(v:Boolean) {
    if (this._isExpanded != v)
      this._isExpanded = v;
  }
  /**
   * Возвращает "true", если элемент является вложенным
   * @type {boolean}
   */
  public isSub:Boolean = false;

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
    if (this._selected != v)
      this._selected = v;
  }

  /**
   * @private
   */
  public _childrenData:Array<StateData>;

  /**
   * Возвращает структуру детей
   * @returns {Array<{name: String, route: String}>}
   */
  public get childrenData() {
    return this._childrenData;
  }

  /**
   * Устанавливает структуру детей
   * @param v
   */
  public set childrenData(v) {
    if (this._childrenData != v) {
      this._childrenData = v;
      this.isSub = false;
    }
  }

  /**
   * @private
   */
  public _children:Array<DtMenuNavigatorItemModel>;

  /**
   * Возвращает структуру детей
   * @returns {Array<{name: String, route: String}>}
   */
  public get children() {
    return this._children;
  }
  /**
   * Устанавливает структуру детей
   * @param v
   */
  public set children(v) {
    if (this._children != v)
      this._children = v;
  }

  /**
   * Возвращает порядковый индекс
   * @returns {number}
   */
  public get index() : number {
    return this._index;
  }

  /**
   * Возвращает порядковый индекс родителя
   * @returns {number}
   */
  public get parentIndex() : number {
    return this._parentIndex;
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

  constructor(public navigator:DtMenuNavigatorComponent,
              private _parentIndex:number,
              private _index:number,
              private _name:string,
              private _route:string) {
  }
}

export class DtMenuNavigatorProvider {

  private _rootItem:DtMenuNavigatorItemModel;

  public get rootItem() : DtMenuNavigatorItemModel {
    return this._rootItem;
  }

  private _items:Array<DtMenuNavigatorItemModel>;

  public _selectedItem:DtMenuNavigatorItemModel;

  /**
   * Возвращаем модель выбранного элемента
   * @returns {DtMenuNavigatorItemModel}
   */
  public get selectedItem() : DtMenuNavigatorItemModel {
    return this._selectedItem;
  }

  constructor(rootName:string = 'root', rootRoute:string = 'root') {
    this._rootItem = new DtMenuNavigatorItemModel(null, -1, -1, rootName, rootRoute);
  }

  public activateTab(tabInds:{lvl1:number, lvl2:number}) : void {
    if (tabInds == null || tabInds.lvl1 == -1) {
      this.select(this._rootItem);
    } else
    if (this._items.length > tabInds.lvl1) {
      var item: DtMenuNavigatorItemModel;
      if (tabInds.lvl2 >= 0) {
        if (this._items[tabInds.lvl1].children.length > tabInds.lvl2) {
          item = this._items[tabInds.lvl1].children[tabInds.lvl2];
          this.select(item);
        }
      } else {
        item = this._items[tabInds.lvl1];
        this.select(item);
      }
    }
  }

  public setupChildrenFor(index:number, children:Array<DtMenuNavigatorItemModel>) : void {
    if (index == -1) {
      this._items = children;
    } else {
      var parentItem:DtMenuNavigatorItemModel = this._items.length > index ? this._items[index] : null;
      if (parentItem != null) {
        parentItem.children = children;
      }
    }
  }

  /**
   * Сбрасывает выделение выбранного элемента
   */
  public reset() : void {
    if (this._selectedItem != null) {
      this._selectedItem.selected = false;
      this._selectedItem = null;
    }
  }

  /**
   * Выделяет запрашиваемый объект и снимает выделение с предыдущего выбранного элемента
   * @param item {DtMenuNavigatorItemModel}
   * @returns DtMenuNavigatorItemModel
   */
  public select(item:DtMenuNavigatorItemModel) : DtMenuNavigatorItemModel {
    if (this._selectedItem != item) {
        var lastSelectedItem: DtMenuNavigatorItemModel = this._selectedItem;
        this._selectedItem = item;
        if (item != null) {
          item.selected = true;
          if (item.navigator != null)
            item.navigator.changeItem.emit(item);
        }
        if (lastSelectedItem != null) {
          lastSelectedItem.selected = false;
          lastSelectedItem = null;
        }
    }
    return item;
  }
}

export class StateData {
  constructor ( public name:string,
                public route:string,
                public children:Array<StateData> = [] ) {}
}
