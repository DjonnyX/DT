import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationSuccessfulDialogComponent } from './registration-successful-dialog.component';
import { RegistrationService } from './registration.service';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core/components';


@NgModule({
  imports: [MdlModule, CommonModule, ReactiveFormsModule],
  declarations: [RegistrationSuccessfulDialogComponent],
  entryComponents: [RegistrationSuccessfulDialogComponent],
  providers: [RegistrationService]
})
export class RegistrationModule {}
