import { Input } from '@angular/core';

export class DtScreen {

  private _lvl1:number = -1;

  @Input('lvl1')

  /**
   * Возвращает индекс родителя
   * @returns {Number}
   */
  public get lvl1() : number {
    return this._lvl1;
  }

  /**
   * Задает индекс родителя.
   * @type {Number}
   */
  public set lvl1(v:number) {
    if (this._lvl1 != v)
      this._lvl1 = v;
  }

  private _lvl2:number = -1;

  @Input('parentIndex')

  /**
   * Возвращает индекс родителя
   * @returns {Number}
   */
  public get lvl2() : number {
    return this._lvl2;
  }

  /**
   * Задает индекс родителя.
   * @type {Number}
   */
  public set lvl2(v:number) {
    if (this._lvl2 != v)
      this._lvl2 = v;
  }
  constructor() {}
}
