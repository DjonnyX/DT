import { Component, OnInit, DoCheck, OnChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data-service.service';
import { Localization } from '../../localization';

//md5
import { md5 } from '../../../utils/md5';

import { Observable } from 'rxjs/Observable';

import { Formatter } from '../../../utils/formatter';

import { routerTransition } from '../../route/router.animations';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import {AppComponent} from "../../app.component";
import {AuthorizationComponent} from "../authorization.component";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None/*,
  animations: [routerTransition()],
  host: {'[@routerTransition]': 'true'}*/
})
export class RegistrationComponent implements DoCheck, OnChanges, OnInit {

  public userName_isError:boolean = false;
  public userName_validator = '^[a-z0-9_-]{5,}$';
  public userName_errorMessage:string='';

  public email_isError:boolean = false;
  public email_validator = "^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
  public email_errorMessage:string='';

  public password_isError:boolean = false;
  public password_validator = "^[A-Za-z0-9!#$%&'*+=?^_`{|}~-]{5,}$";
  public password_errorMessage:string='';

  public phone_isError:boolean = false;
  public phone_validator = "^[0-9 ()+-]{22}$";
  public phone_errorMessage:string='';

  public confirmPassword_isError:boolean = false;
  public confirmPassword_errorMessage:string='';

  public preloaderClass:string = 'show';

  public sended:number = 0;

  public get isValid() : boolean {
    var value:{email:string, userName:string, phone:string, password:string, confirmPassword:string} = this.form.getRawValue();
    return !this.phone_isError &&
      !this.userName_isError &&
      !this.email_isError &&
      !this.password_isError &&
      !this.confirmPassword_isError &&
      value.email.length > 0 &&
      value.userName.length > 0 &&
      value.phone.length > 0 &&
      value.password.length > 0 &&
      value.confirmPassword.length > 0;
  }

  private _clearBeforeTransition:boolean = true;
  public form: FormGroup;
  public fEmail = new FormControl('');
  public fUserName = new FormControl('');
  public fPhone = new FormControl('');
  public fPassword = new FormControl('');
  public fConfirmPassword = new FormControl('');

  constructor(private _router:Router, private _app:AppComponent, private _auth:AuthorizationComponent, private _dataService:DataService, private _formBuilder: FormBuilder) {
    _router.events.subscribe(function() {
      // после перехода будут очищаться данные формы, чтобы не предлагать сохранять пароль, когда это не нужно!
      if (this._clearBeforeTransition) {
        if (this.form != null) {
          this.form.setValue({fEmail:'', fUserName:'', fPhone:'', fPassword:'', fConfirmPassword:''});
        }
      }
    });
  }

  ngOnInit() {

    this.form = this._formBuilder.group({
      'email':  this.fEmail,
      'userName':   this.fUserName,
      'phone':      this.fPhone,
      'password':     this.fPassword,
      'confirmPassword':  this.fConfirmPassword
    });

    this.form.valueChanges
    .map((formValues) => {

      var $userName:string = formValues.userName;
      this.userName_isError = true;
      if ($userName.length != 0 && ($userName.length < 5 || $userName.length > 15)) {
        this.userName_errorMessage = Localization.getLocalizationFor(Localization.REGISTRATION_PROMPT, Localization.KEY_USER_NAME_WRONG_LENGTH);
      } else
        if ($userName.length != 0 && $userName.match(this.userName_validator) == null) {
          this.userName_errorMessage = Localization.getLocalizationFor(Localization.REGISTRATION_PROMPT, Localization.KEY_USER_NAME_ALLOWED_SYMBOLS);
      } else {
          this.userName_isError = false;
          this.userName_errorMessage = '';
      }

      formValues.email = formValues.email.toLowerCase();
      this.email_isError = true;
      var $email:string = formValues.email;
      if ($email.length != 0 && $email.match(this.email_validator) == null) {
        this.email_errorMessage = Localization.getLocalizationFor(Localization.REGISTRATION_PROMPT, Localization.KEY_EMAIL_INCORRECT_FORMAT);
      } else {
        this.email_isError = false;
        this.email_errorMessage = '';
      }

      var $phone:string = formValues.phone;
      this.phone_isError = true;
      if ($phone.length != 0) {
        var formatPhone: string = Formatter.phoneFormat($phone);
        if ($phone != formatPhone) {
          this.fPhone.setValue(Formatter.phoneFormat(formValues.phone));
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

      this.password_isError = true;
      var $password:string = formValues.password;
      if ($password.length != 0 && $password.length < 5) {
        this.password_errorMessage = Localization.getLocalizationFor(Localization.REGISTRATION_PROMPT, Localization.KEY_PASSWORD_WRONG_LENGTH);
      } else
      if ($password.length != 0 && $password.match(this.password_validator) == null) {
        this.password_errorMessage = Localization.getLocalizationFor(Localization.REGISTRATION_PROMPT, Localization.KEY_PASSWORD_INCORRECT_FORMAT);
      } else {
        this.password_isError = false;
        this.password_errorMessage = '';
      }

      this.confirmPassword_isError = true;
      var $confirmPassword:string = formValues.confirmPassword;
      /*if ($confirmPassword.length != 0 && $confirmPassword.length < 5) {
        this.confirmPassword_errorMessage = Localization.getLocalizationFor(Localization.REGISTRATION_PROMPT, Localization.KEY_PASSWORD_WRONG_LENGTH);
      } else
      if ($confirmPassword.length != 0 && $confirmPassword.match(this.password_validator) == null) {
        this.confirmPassword_errorMessage = Localization.getLocalizationFor(Localization.REGISTRATION_PROMPT, Localization.KEY_PASSWORD_INCORRECT_FORMAT);
      } else*/
      if ($confirmPassword.length != 0 && $confirmPassword != $password) {
        this.confirmPassword_errorMessage = Localization.getLocalizationFor(Localization.REGISTRATION_PROMPT, Localization.KEY_PASSWORDS_NOT_EQUAL);
      } else {
        this.confirmPassword_isError = false;
        this.confirmPassword_errorMessage = '';
      }

      return formValues;
    }).subscribe((formValues) => {});

    // Перевести там в состояние, если переход осуществляется с помощью url
    this._auth.tabIndex = 1;
  }

  ngOnChanges() {

  }

  // We "know" that the only way the list can change is
  // identity or in length so that's all we check
  ngDoCheck() {
    //this.phone = String(Number(this.phone) + 1);
  }


  /**
   * Регистрация
   * @param data
   */
  public registration() : void {

    var self = this;
    var value:{email:string, userName:string, phone:string, password:string, confirmPassword:string} = this.form.getRawValue();
    console.log(value);

    if (this.isValid) {
      this.sended = 1;
      setTimeout( () => {
        self.preloaderClass = 'show';
      }, 100);
      if (AppComponent.isDemo) {
        setTimeout(()=> {
          this._clearBeforeTransition = false;
          self._auth.tabIndex = 0;
        }, 2000);
      } else {
        this._dataService.registration({
          phone: value.phone,
          email: value.email,
          user_name: value.userName,
          password: md5(value.password)
        }).subscribe(
          data => {
            if (data.error == null) {
              console.log(data);
              this._clearBeforeTransition = false;
              this.expand();
              self._auth.tabIndex = 0;
              self._auth.showRegistrationSucessMessage(data);
              return true;
            }
            console.log(data.error);
            this.expand();
            this._app.showSnackbar(Localization.getLocalizationFor(data.error.code, data.error.desc), true);
            return false;
          },
          error => {
            console.error(error);
            this.expand();
            this._app.showSnackbar(error, true);
            return Observable.throw(error);
          }
        );
      }
    } else {
      if (this.phone_isError) {
        this._app.showSnackbar(this.phone_errorMessage, true);
      } else
      if (this.userName_isError) {
        this._app.showSnackbar(this.userName_errorMessage, true);
      } else
      if (this.email_isError) {
        this._app.showSnackbar(this.email_errorMessage, true);
      } else
      if (this.password_isError) {
        this._app.showSnackbar(this.password_errorMessage, true);
      } else
      if (this.confirmPassword_isError) {
        this._app.showSnackbar(this.confirmPassword_errorMessage, true);
      } else {
        this._app.showSnackbar(Localization.getLocalizationFor(Localization.REGISTRATION_PROMPT, Localization.KEY_NOT_FILL_REGISTRATION_PARAMS), true);
      }
      this.expand();
    }
  }

  private expand() : void {
    this.preloaderClass = '';
    this.sended = 0;
  }
}
