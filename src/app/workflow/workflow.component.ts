import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from "../app.component";
import { DtMenuNavigatorItemModel, DtMenuNavigatorProvider } from '../controls/dt-menunavigator/dt-menu-navigator.component';

@Component({
  selector: 'workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {

  private _tabInds:{lvl1:number, lvl2:number};

  public set tabInds(v:{lvl1:number, lvl2:number})  {
    if (this._tabInds != v) {
      this._tabInds = v;
      this._menuNavigatorProvider.activateTab(this._tabInds);
    }
  }

  public get tabInds() : {lvl1:number, lvl2:number} {
    return this._tabInds;
  }

  private _header:string;

  public get header() : string {
    return this._header;
  }
  public set header(v:string) {
     if (this._header != v)
       this._header = v;
  }

  private _menuNavigatorProvider:DtMenuNavigatorProvider;

  constructor(public router:Router,
              public routerModule:ActivatedRoute,
              private _app:AppComponent) {
    this._menuNavigatorProvider = this._app.menuNavigatorProvider;
    /*router.events.subscribe(function() {
      console.log(router.url);
    });*/
    this._app.onMenuChange = {handler:this.onMenuChange, target:this};
  }

  private _lastRouteItem:DtMenuNavigatorItemModel;

  private onMenuChange(target:WorkflowComponent, item:DtMenuNavigatorItemModel) : void {
    if (item.route == 'main') {
      target.header = '';
    } else {
      target.header = item.name;
      target.redirectTo(item.route);
    }
  }

  public redirectTo(routeName:string) : void {
    this.router.navigate(['./' + routeName], { relativeTo: this.routerModule });
  }

  ngOnInit() {
    this._app.isLogged = true;
    // Необходимо снять выделения с табов
    this.tabInds = null;
  }
}
