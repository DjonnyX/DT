import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data-service.service';
import { Localization } from '../../localization';

//md5
import { md5 } from '../../../utils/md5';

import { Formatter } from '../../../utils/formatter';

import { Observable } from 'rxjs/Observable';

import { routerTransition } from '../../route/router.animations';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {AppComponent} from "../../app.component";
import {AuthorizationComponent} from "../authorization.component";

const emailValidator = Validators.pattern('^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$');

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None/*,
  animations: [routerTransition()],
  host: {'[@routerTransition]': 'true'}*/
})
export class LoginComponent implements OnInit {

  public phone_isError:boolean = false;
  public phone_validator = "^[0-9 ()+-]{22}$";
  public phone_errorMessage:string='';

  public preloaderClass:string = 'show';

  public sended:number = 0;

  public get isValid() : boolean {
    var value:{phone:string, password:string} = this.form.getRawValue();
    return !this.phone_isError &&
      value.password.length > 0;
  }

  private _clearBeforeTransition:boolean = true;
  public form: FormGroup;
  public fPhone = new FormControl('');
  public fPassword = new FormControl('');

  constructor(private _router:Router, private _app:AppComponent, private _auth:AuthorizationComponent, private _dataService:DataService, private _formBuilder: FormBuilder) {
    _router.events.subscribe(function() {
      // после перехода будут очищаться данные формы, чтобы не предлагать сохранять пароль, когда это не нужно!
      if (this._clearBeforeTransition) {
        if (this.form != null) {
          this.form.setValue({fPhone:'', fPassword:''});
        }
      }
    });
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      'phone': this.fPhone,
      'password': this.fPassword,
    });

    this.form.valueChanges
      .map((formValues) => {
        var $phone:string = formValues.phone;
        this.phone_isError = true;
        if ($phone.length != 0) {
          var formatPhone: string = Formatter.phoneFormat($phone);
          console.log($phone, formatPhone);
          if ($phone != formatPhone) {
            this.fPhone.setValue(formatPhone);
            console.log(this.fPhone);
          }
          if ($phone.length != 0 && $phone.length < 22) {
            this.phone_errorMessage = Localization.getLocalizationFor(Localization.REGISTRATION_PROMPT, Localization.KEY_PHONE_WRONG_LENGTH);
          } else {
            this.phone_isError = false;
            this.phone_errorMessage = '';
          }
        } else {
          this.phone_isError = false;
          this.phone_errorMessage = '';
        }
        return formValues;
      }).subscribe((formValues) => {});

    // Перевести там в состояние, если переход осуществляется с помощью url
    this._auth.tabIndex = 0;
  }

  /**
   * Логин
   * @param data
   */
  public login() : void {
    var self = this;

    var value:{phone:string, password:string} = this.form.getRawValue();
    console.log(value);

    if (this.isValid) {
      this.sended = 1;
      setTimeout(() => {
        self.preloaderClass = 'show';
      }, 100);
      if (AppComponent.isDemo) {
        setTimeout(()=>{
          this._clearBeforeTransition = false;
          self._app.redirect(AppComponent.S_WORKFLOW);
        }, 2000);
      } else {
        this._dataService.login({phone: value.phone, password: md5(value.password)}).subscribe(
          data => {
            if (data.error == null) {
              console.log(data);
              this._clearBeforeTransition = false;
              this.expand();
              DataService.apyKey = data.data.token;
              //document.cookie = 'api_key=' + data.data.token;
              this._app.redirect(AppComponent.S_WORKFLOW);
              return true;
            }
            console.log(data.error);
            this.expand();
            this._app.showSnackbar(Localization.getLocalizationFor(data.error.code, data.error.desc), true);
            return false;
          },
          error => {
            this.expand();
            this._app.showSnackbar(error, true);
            return Observable.throw(error);
          }
        );
      }
    } else {
      if (this.phone_isError) {
        this._app.showSnackbar(this.phone_errorMessage, true);
      } else {
        this._app.showSnackbar(Localization.getLocalizationFor(Localization.LOGIN_PROMPT, Localization.KEY_NOT_FILL_LOGIN_PARAMS), true);
      }
      this.expand();
    }
  }

  private expand() : void {
    this.preloaderClass = '';
    this.sended = 0;
  }
}
