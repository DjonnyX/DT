import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MdlLayoutComponent, MdlSnackbarService, MdlSnackbarComponent } from '@angular-mdl/core/components';
import { DataService } from './data-service.service';
import { Localization } from './localization';


import { StateData, DtMenuNavigatorItemModel, DtMenuNavigatorProvider } from './controls/dt-menunavigator/dt-menu-navigator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public static isDemo:boolean = true;

  public static S_WORKFLOW:string = 'workflow';
  public static S_AUTHORIZATION:string = 'authorization';

  public isLogged:Boolean = false;

  public menuNavigatorProvider:DtMenuNavigatorProvider;

  /**
   * Названия роутов в любом уровне должно быть уникальным, иначе словарь неверно построится!
   * @type Array<StateData>
   */
  public static MENU_ITEMS:Array<StateData> = [
    new StateData('Мои магазины', 'shops'),
    new StateData('Мои модули', 'modules',
      [
        new StateData('collector', 'modules/collector'),
        new StateData('queue', 'modules/queue'),
        new StateData('kiosk', 'modules/kiosk')
      ]
    ),
    new StateData('Настройки', 'settings')
  ];

  /**
   * Словарь роутов
   * @type {}
   */
  public static MENU_ITEMS_DICTIONARY:any = {};

  public static MODULES:Array<{name:string, description:string, url:string, bought:boolean, route:string}> = [
    {name:'Collector', description:'Экран сборщика', url:"http://www.dealto.ru/shop", bought:true, route:'modules/collector'},
    {name:'Queue', description:'Электронная очередь', url:"http://www.dealto.ru/shop", bought:true, route:'modules/queue'},
    {name:'GuestScreen', description:'Экран покупателя', url:"http://www.dealto.ru/shop", bought:false, route:'modules/guest-screen'},
    {name:'SelfOrder', description:'Модуль самозаказа', url:"http://www.dealto.ru/shop", bought:false, route:'modules/self-order'},
    {name:'Kiosk', description:'Киоск самообслуживания', url:"http://www.dealto.ru/shop", bought:true, route:'modules/kiosk'},
    {name:'Analytics', description:'Отчеты и инструменты для анализа', url:"http://www.dealto.ru/shop", bought:false, route:'modules/analytics'}
  ];

  public menuItems:Array<{name:string, route:string, children:Array<{name:string, route:string}>}> = JSON.parse(JSON.stringify(AppComponent.MENU_ITEMS));

  constructor (private _router:Router,
               private _dataService:DataService,
               private _snackbarService: MdlSnackbarService) {

    this.createMenuItemsDictionary();

    this.redirect('authorization');

    // оздается провайдер меню, в качестве аргумента передается нулевой роут
    this.menuNavigatorProvider = new DtMenuNavigatorProvider('main', 'main');
  }

  /**
   * Создает словарь роутов
   */
  public createMenuItemsDictionary() : void {
    var list:Array<StateData> = AppComponent.MENU_ITEMS;
    var listLength:number = list.length;
    var dictioanry:any = AppComponent.MENU_ITEMS_DICTIONARY;
    for (var i:number = 0; i < listLength; i ++) {
      var item:StateData = list[i];
      var childrenLength:number = list[i].children.length;
      for (var j:number = 0; j < childrenLength; j++) {
        var children:StateData = list[i].children[j];
        dictioanry[children.route] = {lvl1:i, lvl2:j};
      }
      dictioanry[item.route] = {lvl1:i, lvl2:-1};
    }
  }

  public redirect(pagename: string) : void {
    this._router.navigate(['/' + pagename]);
  }

  public onMenuChange:{handler:Function, target:any};

  public menuNavigator_change(event, drawer:MdlLayoutComponent = null) : void {
    var item:DtMenuNavigatorItemModel = event;

    // Открывает док, когда происходит переход по табам и скрывает, если навигация вне таба.
    // Условие выполняется, если это мобильные и т.п. устройства.
    if (drawer != null) {
      if (item.parentIndex == -1 && item.index == -1)
        drawer.closeDrawer();
      else
        drawer.openDrawer();
    }

    if (this.onMenuChange != null)
      this.onMenuChange.handler(this.onMenuChange.target, item);
  }

  public showSnackbar(msg:string, isError:boolean = false) {
    this._snackbarService.showToast(msg, 10000);
    if (isError) {
      var snacks = document.getElementsByTagName('mdl-snackbar-component');
      if (snacks.length > 0) {
        var currentSnack = snacks[snacks.length - 1];
        currentSnack.classList.add('error');
      }
    }
  }

  public showMainPaige() : void {
    if (this.isLogged)
      this.redirect(AppComponent.S_WORKFLOW + '/main');
  }

  /**
   * Логаут
   * @param data
   */
  public logout() : void {
    if (AppComponent.isDemo) {
      this.redirect(AppComponent.S_AUTHORIZATION);
    } else {
      this._dataService.logout().subscribe(
        data => {
          if (data.error == null) {
            console.log(data);
            DataService.apyKey = '';
            //document.cookie = 'api_key=';
            this.redirect(AppComponent.S_AUTHORIZATION);
            return true;
          }
          console.log(data.error);
          this.showSnackbar(Localization.getLocalizationFor(data.error.code, data.error.desc), true);
          return false;
        },
        error => {
          console.error(error);
          this.showSnackbar(error, true);
          return Observable.throw(error);
        }
      );
    }
  }
}
