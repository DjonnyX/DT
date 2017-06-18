import { Component, OnInit } from '@angular/core';

import { AppComponent } from "../../app.component";
import { WorkflowComponent } from '../workflow.component';

import { DtScreen } from '../../controls/dt-screen';

@Component({
  selector: 'shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent extends DtScreen implements OnInit {

  public shops:Array<{name:string, address:string, id:string, color:string}> = [];

  constructor(private _app:AppComponent,
              private _workflow:WorkflowComponent) {
    super();
    this.lvl1 = AppComponent.MENU_ITEMS_DICTIONARY['shops'].lvl1;
    this.lvl2 = AppComponent.MENU_ITEMS_DICTIONARY['shops'].lvl2;
  }

  ngOnInit() {
    for (var i:number = 0; i < 5; i ++) {
      this.shops.push(
        {
          color:'#ff0000',
          id:'123',
          name:'магазин ' + i,
          address:'г. Воронеж, ул Свободы, д.15'});
        }
    this._workflow.tabInds = {lvl1:this.lvl1, lvl2:this.lvl2};
  }
}
