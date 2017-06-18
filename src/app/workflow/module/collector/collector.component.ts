import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from "../../../app.component";
import { WorkflowComponent } from '../../workflow.component';

import { DtScreen } from '../../../controls/dt-screen';

import { DtTabbarItemModel } from "../../../controls/dt-tabbar/dt-tabbar.component";
@Component({
  selector: 'collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.scss']
})
export class CollectorComponent extends DtScreen implements OnInit {

  public tabbarItems:Array<{name:string, route:string}> = [
    {name:'Экземпляры', route:'instances'},
    {name:'Конфигуратор', route:'configurator'}
  ];

  /**
   * Эмиттор события изменения таба
   * @type {EventEmitter<Number>}
   */
  @Output()
  changeTab:EventEmitter<Number> = new EventEmitter<Number>();

  private _tabIndex:Number;

  public set tabIndex(v:Number)  {
    if (this._tabIndex != v) {
      this._tabIndex = v;
      this.changeTab.emit(this._tabIndex);
    }
  }

  public get tabIndex() : Number {
    return this._tabIndex;
  }

  constructor(private _app:AppComponent,
              private _workflow:WorkflowComponent,
              private _router:Router,
              private _routerModule:ActivatedRoute) {
    super();
    this.lvl1 = AppComponent.MENU_ITEMS_DICTIONARY['modules/collector'].lvl1;
    this.lvl2 = AppComponent.MENU_ITEMS_DICTIONARY['modules/collector'].lvl2;
  }

  ngOnInit() {
    this._workflow.tabInds = {lvl1:this.lvl1, lvl2:this.lvl2};
  }

  public tabbar_change(event) : void {
    var item:DtTabbarItemModel = event;
    this._tabIndex = item.index;
    this.redirectTo(item.route);
  }

  public redirectTo(routeName:string) : void {
    this._router.navigate(['./' + routeName], { relativeTo: this._routerModule });
  }
}
