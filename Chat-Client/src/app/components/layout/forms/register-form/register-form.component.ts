import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../logo/logo.component';
import { StepperComponent } from '../../stepper/stepper.component';
import { RegisterFormBasicComponent } from '../register-form-basic/register-form-basic.component';
import { RegisterFormAddictionalComponent } from '../register-form-addictional/register-form-addictional.component';
import { RegisterFormSpecComponent } from '../register-form-spec/register-form-spec.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';
import { IAccountAuth } from 'src/app/models/account-auth.model';
import { IAccount } from 'src/app/models/account.model';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports:
    [
      CommonModule, LogoComponent, StepperComponent,
      RegisterFormBasicComponent, RegisterFormAddictionalComponent,
      RegisterFormSpecComponent
    ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  host: {
    class: 'register-form-component'
  }
})

export class RegisterFormComponent implements OnDestroy {

  @Output() switchedForm: EventEmitter<void> = new EventEmitter<void>();
  public currentStage: number = 1;
  public registeredAccount!: IAccountAuth;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private registerService: RegisterService,
    private authStateService: AuthStateService
  ) 
  {
    this.registerService.currentRegistrationAccount.subscribe({
      next: (account: IAccountAuth | null) => {
        if (account) {
          this.registeredAccount = account;
        }
      }
    });
  }

  public switchForm(): void {
    this.switchedForm.emit();
  }

  public incrementStage(): void {
    if (this.currentStage === 3) {
      this.authService.register(this.registeredAccount).subscribe({
        next: (account: IAccount) => {
          this.authStateService.setCurrentAccount(account);
          this.router.navigate(['/main']);
        }
      });
    }
    this.currentStage++;
  }

  public decrementStage(): void {
    this.currentStage--;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
