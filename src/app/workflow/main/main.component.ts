import { Component, OnInit } from '@angular/core';

import { AppComponent } from "../../app.component";
import { WorkflowComponent } from '../workflow.component';

import { DtScreen } from '../../controls/dt-screen';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends DtScreen implements OnInit {

  public tabbarItems:Array<{name:string, route:string}> = [
    {name:'основные', route:'login'},
    {name:'безопасность', route:'registration'}
  ];

  constructor(private _app:AppComponent,
              private _workflow:WorkflowComponent) {
    super();
    this.lvl1 = -1;
    this.lvl2 = -1;
  }

  ngOnInit() {
    this._workflow.tabInds = {lvl1:this.lvl1, lvl2:this.lvl2};
  }
}
