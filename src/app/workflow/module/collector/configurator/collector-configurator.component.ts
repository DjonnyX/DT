import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from "../../../../app.component";
import { WorkflowComponent } from '../../../workflow.component';

import { DtScreen } from '../../../../controls/dt-screen';

@Component({
  selector: 'collector-configurator',
  templateUrl: './collector-configurator.component.html',
  styleUrls: ['./collector-configurator.component.scss']
})
export class CollectorConfiguratorComponent extends DtScreen implements OnInit {

  constructor(private _app:AppComponent,
              private _workflow:WorkflowComponent,
              private _router:Router,
              private _routerModule:ActivatedRoute) {
    super();
  }

  ngOnInit() {

  }
}
