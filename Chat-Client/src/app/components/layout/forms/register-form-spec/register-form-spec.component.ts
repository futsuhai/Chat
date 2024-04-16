import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SiteConfigState } from 'src/app/states/site-config.state';
import { RegisterService } from 'src/app/services/register.service';
import { IAccountAuth } from 'src/app/models/account-auth.model';

@Component({
  selector: 'app-register-form-spec',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form-spec.component.html',
  styleUrls: ['./register-form-spec.component.scss'],
  host: {
    class: 'register-form-spec'
  }
})

export class RegisterFormSpecComponent {

  @Output() incrementStage: EventEmitter<void> = new EventEmitter<void>();
  @Output() decrementStage: EventEmitter<void> = new EventEmitter<void>();
  public registerSpecForm: FormGroup;
  public specializations: string[] = [];
  public savedUser!: IAccountAuth;

  constructor(private siteConfigState: SiteConfigState, private registerService: RegisterService, private fb: FormBuilder) {
    this.specializations = this.siteConfigState.Specializations;
    if (this.registerService.currentRegistrationAccount$.value !== null) {
      this.savedUser = this.registerService.currentRegistrationAccount$.value; 
      this.registerSpecForm = this.initSavedRegisterSpecForm();
    } else {
      this.registerSpecForm = this.initRegisterSpecForm();
    }
  }

  private initRegisterSpecForm(): FormGroup {
    const formGroup = this.fb.group({});
    this.specializations.forEach((index) => {
      formGroup.addControl(`spec${index + 1}`, new FormControl(false));
    });
    return formGroup;
  }

  private initSavedRegisterSpecForm(): FormGroup {
    const formGroup = this.fb.group({});
    this.specializations.forEach((spec, index) => {
      const isChecked = this.savedUser.specializations?.includes(spec) || false;
      formGroup.addControl(`spec${index + 1}`, new FormControl(isChecked));
    });
    return formGroup;
  }
  

  public submitRegisterSpecForm(): void {
    if (this.registerSpecForm.valid) {
      const formValue = this.registerSpecForm.value;
      const specArray: string[] = [];
      this.specializations.forEach((spec, index) => {
        if (formValue[`spec${index + 1}`]) {
          specArray.push(this.specializations[index]);
        }
      });
      const user: IAccountAuth = {
        specializations: specArray
      };
      this.registerService.updateRegistrationAccount(user);
      this.incrementStage.emit();
    }
  }

  public backToPreviousStage(): void {
    if (this.registerSpecForm.valid) {
      const formValue = this.registerSpecForm.value;
      const specArray: string[] = [];
      this.specializations.forEach((spec, index) => {
        if (formValue[`spec${index + 1}`]) {
          specArray.push(this.specializations[index]);
        }
      });
      const user: IAccountAuth = {
        specializations: specArray
      };
      this.registerService.updateRegistrationAccount(user);
    }
    this.decrementStage.emit();
  }
}
