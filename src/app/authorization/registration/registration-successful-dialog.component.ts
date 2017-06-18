import {
  Component,
  ViewChild,
  HostListener,
  OnInit,
  Inject,
  InjectionToken
} from '@angular/core';
import { RegistrationService } from './registration.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MdlTextFieldComponent, MdlDialogReference  } from '@angular-mdl/core/components';

@Component({
  selector: 'registration-successful-dialog',
  templateUrl: './registration-successful-dialog.component.html',
  styleUrls: ['./registration-successful-dialog.component.scss'],
})

export class RegistrationSuccessfulDialogComponent implements OnInit {

  @ViewChild('firstElement') private inputElement: MdlTextFieldComponent;

  public form: FormGroup;
  public username = new FormControl('',  Validators.required);
  public password = new FormControl('', Validators.required);

  constructor(
    private _dialog: MdlDialogReference,
    private _formBuilder: FormBuilder,
    private _registrationService: RegistrationService) {}


  public ngOnInit() {
    this.form = this._formBuilder.group({
      'username':  this.username,
      'password':   this.password
    });
  }


  public close() {
    this._dialog.hide();
    /*this.processingLogin = true;
    this.statusMessage = 'checking your credentials ...';

    let obs = this._registrationService.login(this.username.value, this.password.value);
    obs.subscribe( user => {

      this.processingLogin = false;
      this.statusMessage = 'you are logged in ...';

      setTimeout( () => {
        this._dialog.hide(user);
      }, 500);

    });*/
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this._dialog.hide();
  }
}
