import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { IUserAuth } from 'src/app/models/user-auth.model';

@Component({
  selector: 'app-register-form-addictional',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form-addictional.component.html',
  host: {
    class: 'register-form-addictional'
  }
})

export class RegisterFormAddictionalComponent {

  @Output() incrementStage: EventEmitter<void> = new EventEmitter<void>();
  @Output() decrementStage: EventEmitter<void> = new EventEmitter<void>();
  public registerAddictionalForm: FormGroup;
  public savedUser!: IUserAuth;

  constructor(private registerService: RegisterService) {
    if (this.registerService.currentRegistrationUser.value !== null) {
      this.savedUser = this.registerService.currentRegistrationUser.value;
      this.registerAddictionalForm = this.initSavedRegisterAddictionalForm();
    } else {
      this.registerAddictionalForm = this.initRegisterAddictionalForm();
    }
  }

  private initRegisterAddictionalForm(): FormGroup {
    return new FormGroup({
      bio: new FormControl<string | null>(""),
      url1: new FormControl<string | null>(""),
      url2: new FormControl<string | null>(""),
      url3: new FormControl<string | null>("")
    });
  }

  private initSavedRegisterAddictionalForm(): FormGroup {
    if (this.savedUser && this.savedUser.socialMediaUrls) {
      return new FormGroup({
        bio: new FormControl<string | null>(this.savedUser.bio || ""),
        url1: new FormControl<string | null>(this.savedUser.socialMediaUrls[0] || ""),
        url2: new FormControl<string | null>(this.savedUser.socialMediaUrls[1] || ""),
        url3: new FormControl<string | null>(this.savedUser.socialMediaUrls[2] || "")
      });
    } else {
      return this.initRegisterAddictionalForm();
    }
  }


  public submitRegisterAddictionalForm(): void {
    if (this.registerAddictionalForm.valid) {
      const formValue = this.registerAddictionalForm.value;
      const socialMediaUrls = [
        formValue.url1,
        formValue.url2,
        formValue.url3
      ];
      const user: IUserAuth = {
        bio: formValue.bio,
        socialMediaUrls: socialMediaUrls
      };
      this.registerService.updateRegistrationUser(user);
      this.incrementStage.emit();
    }
  }

  public backToPreviousStage(): void {
    this.decrementStage.emit();
  }
}
