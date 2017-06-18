import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from "../../../../app.component";
import { WorkflowComponent } from '../../../workflow.component';

import { DtScreen } from '../../../../controls/dt-screen';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
@Component({
  selector: 'collector-instances',
  templateUrl: './collector-instances.component.html',
  styleUrls: ['./collector-instances.component.scss']
})
export class CollectorInstancesComponent extends DtScreen implements OnInit {

  public instances:Array<{name:string, rest:{id:string, name:string}, cashes:Array<string>, id:string, color:string}> = [];
  public form: FormGroup;

  public personId: FormControl = new FormControl(1);

  constructor(private _app:AppComponent,
              private _workflow:WorkflowComponent,
              private _router:Router,
              private _routerModule:ActivatedRoute) {
    super();
    for (var i:number = 0; i < 50; i ++) {
      this.instances.push(
        {
          color:'#ff0000',
          id:'123',
          rest:{id:'1000127', name:'магазин 1'},
          cashes:['10001', '10003', '10002'],
          name:'Сборщик ' + i});
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      personId: this.personId
    });
  }
}
