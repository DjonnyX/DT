import { Component, OnInit } from '@angular/core';

import { AppComponent } from "../../app.component";
import { WorkflowComponent } from '../workflow.component';

import { DtScreen } from '../../controls/dt-screen';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends DtScreen implements OnInit {

  public tabbarItems:Array<{name:string, route:string}> = [
    {name:'основные', route:'login'},
    {name:'безопасность', route:'registration'}
  ];

  constructor(private _app:AppComponent,
              private _workflow:WorkflowComponent) {
    super();
    this.lvl1 = AppComponent.MENU_ITEMS_DICTIONARY['settings'].lvl1;
    this.lvl2 = AppComponent.MENU_ITEMS_DICTIONARY['settings'].lvl2;
  }

  ngOnInit() {
    this._workflow.tabInds = {lvl1:this.lvl1, lvl2:this.lvl2};
  }
}
