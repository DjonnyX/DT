import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from "../../app.component";
import { DtTabbarItemModel } from "../../controls/dt-tabbar/dt-tabbar.component";
import { WorkflowComponent } from '../workflow.component';

import { DtScreen } from '../../controls/dt-screen';

@Component({
  selector: 'modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent extends DtScreen implements OnInit {

  /**
   * Эмиттор события изменения таба
   * @type {EventEmitter<Number>}
   */
  @Output()
  changeTab:EventEmitter<Number> = new EventEmitter<Number>();

  private _onlyBought:boolean = false;

  @Input()
  public set onlyBought(v:boolean) {
    if (this._onlyBought != v)
      this._onlyBought = v;
  }
  public get onlyBought() : boolean {
    return this._onlyBought;
  }

  public moduleList:Array<{name:string, description:string, url:string, bought:boolean, route:string}> = JSON.parse(JSON.stringify(AppComponent.MODULES));

  public tabbarItems:Array<{name:string, route:string}> = [
    {name:'все', route:'all'},
    {name:'активные', route:'activated'}
  ];

  /**
   * В теле реализуется кастомная реализация лэйаута по ширине
   * @param event
   */
  public onResize(event) {
    console.log('onResize');
    if (this._canvasHTML != null && this._containerHTML != null) {
      //var items = document.getElementsByTagName('dt-module-card');
      //var item = items.length > 0 ? items[0] : null;
      //if (item != null) {
        var width: number = this._canvasHTML.clientWidth;
        var columns: number = Math.floor(width / 212);//item.clientWidth);
        if (columns < 1)
          columns = 1;
        var resultWidth: number = columns * 212;//item.clientWidth;
        this._containerHTML.style.width = resultWidth + 'px';
        return;
      //}
      //setTimeout(this.onResize, 1000, null);
    }
  }

  private _tabIndex:number = 0;

  public set tabIndex(v:number)  {
    if (this._tabIndex != v) {
      this._tabIndex = v;
      this.changeTab.emit(this._tabIndex);
    }
  }

  public get tabIndex() : number {
    return this._tabIndex;
  }

  public style;

  private _canvasHTML;
  private _containerHTML;

  constructor(private _router:Router,
              private _routerModule:ActivatedRoute,
              private _app:AppComponent,
              private _workflow:WorkflowComponent) {
    super();
    this.lvl1 = AppComponent.MENU_ITEMS_DICTIONARY['modules'].lvl1;
    this.lvl2 = AppComponent.MENU_ITEMS_DICTIONARY['modules'].lvl2;
  }

  ngOnInit() {
    this.initHTMLItems();
    this._workflow.tabInds = {lvl1:this.lvl1, lvl2:this.lvl2};
  }

  private initHTMLItems() : void {
    console.log('init Items');
    this._canvasHTML = document.getElementById('dt-modules-canvas');
    this._containerHTML = document.getElementById('dt-modules-container');
    if (this._canvasHTML == null || this._containerHTML == null)
      setTimeout(this.initHTMLItems, 100);
    else
      this.onResize(null);
  }

  public onSelect(item:{name:string, description:string, url:string, bought:boolean, route:string}) : void {
    if (item.bought) {
      this.selectModule(item);
    } else {
      window.open(item.url, "_blank");
    }
  }

  public redirectTo(routeName:string) : void {
    this._router.navigate(['./' + routeName], { relativeTo: this._routerModule });
  }

  public tabbar_change(event) : void {
    var item:DtTabbarItemModel = event;
    var onlyBought:boolean = item.index == 1;
    if (onlyBought != this.onlyBought) {
      this.onlyBought = onlyBought;
      this._tabIndex = item.index;
      this.redirectTo(item.route);
    }
  }

  public selectModule(item:{name:string, description:string, url:string, bought:boolean, route:string}) : void  {
    this._workflow.redirectTo(item.route);
  }
}

@Component({
  selector: 'all',
  template: '<ng-content></ng-content>'
})
export class ModulesFilterAllComponent implements OnInit {

  constructor(private _modules:ModulesComponent) {}

  ngOnInit() {
    this._modules.tabIndex = 0;
  }
}

@Component({
  selector: 'activated',
  template: '<ng-content></ng-content>'
})
export class ModulesFilterActivatedComponent implements OnInit {

  constructor(private _modules:ModulesComponent) {}

  ngOnInit() {
    this._modules.tabIndex = 1;
  }
}
