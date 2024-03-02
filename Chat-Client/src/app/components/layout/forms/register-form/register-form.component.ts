import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../logo/logo.component';
import { StepperComponent } from '../../stepper/stepper.component';
import { RegisterFormBasicComponent } from '../register-form-basic/register-form-basic.component';
import { RegisterFormAddictionalComponent } from '../register-form-addictional/register-form-addictional.component';
import { RegisterFormSpecComponent } from '../register-form-spec/register-form-spec.component';
import { Router } from '@angular/router';

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

export class RegisterFormComponent {

  @Output() switchedForm: EventEmitter<void> = new EventEmitter<void>();
  public currentStage: number = 1;

  constructor(private router: Router) { }

  public switchForm(): void {
    this.switchedForm.emit();
  }

  public incrementStage(): void {
    this.currentStage++;
    if (this.currentStage === 4) {
      this.router.navigate(['/main']);
    }
  }

  public decrementStage(): void {
    this.currentStage--;
  }
}
