import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import { DtTabbarItemModel } from "../controls/dt-tabbar/dt-tabbar.component";
import { RegistrationSuccessfulDialogComponent } from "./registration/registration-successful-dialog.component";
import {
  MdlDialogService,
  MdlDialogReference
} from '@angular-mdl/core/components';

@Component({
  selector: 'authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AuthorizationComponent implements OnInit {


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

  public tabbarItems:Array<{name:string, route:string}> = [
    {name:'вход', route:'login'},
    {name:'регистрация', route:'registration'}
  ];

  private _viewportHTML;

  constructor(private _router:Router,
              private _routerModule:ActivatedRoute,
              private _app:AppComponent,
              private dialogService: MdlDialogService) {

  }

  /**
   * В теле реализуется кастомная подгонка лэйаута по ширине
   * В стилях размеры менять нельзя, иначе все "поплывет"
   * @param event
   */
  public onResize(event) {
    var resultHeight: number = window.innerHeight - 220;
    this._viewportHTML.style['min-height'] = resultHeight + 'px';
  }

  public redirectTo(routeName:string) : void {
    this._router.navigate(['./' + routeName], { relativeTo: this._routerModule });
  }

  public tabbar_change(event) : void {
    var item:DtTabbarItemModel = event;
    this._tabIndex = item.index;
    this.redirectTo(item.route);
  }

  ngOnInit() : void {
    this._app.logout();
    this._app.isLogged = false;
    this._viewportHTML = document.getElementById('auth-viewport');
    this.onResize(null);
  }

  public showRegistrationSucessMessage(data:any) : void {
    var dialog = this.dialogService.showCustomDialog({
      component: RegistrationSuccessfulDialogComponent,
      isModal: true,
      styles: {'width': '300px'},
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });
  }
}
