import { Component, OnInit } from '@angular/core';

import { AppComponent } from "../../app.component";
import { WorkflowComponent } from '../workflow.component';

import { DtScreen } from '../../controls/dt-screen';

@Component({
  selector: 'module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent extends DtScreen implements OnInit {

  public tabbarItems:Array<{name:string, route:string}> = [
    {name:'основные', route:'login'},
    {name:'привязки', route:'registration'},
    {name:'оформления', route:'registration'}
  ];

  constructor(private _app:AppComponent,
              private _workflow:WorkflowComponent) {
    super();
  }

  ngOnInit() {

  }
}
