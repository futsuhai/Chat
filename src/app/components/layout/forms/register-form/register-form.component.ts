import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../logo/logo.component';
import { StepperComponent } from '../../stepper/stepper.component';
import { Specializations } from 'src/app/models/specialization.model';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, LogoComponent, StepperComponent],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  host: {
    class: 'register-form-component'
  }
})
export class RegisterFormComponent {

  @Output() switchedForm: EventEmitter<void> = new EventEmitter<void>();
  public currentStage: number = 1;
  public specializations: string[] = Specializations;

  public switchForm(): void {
    this.switchedForm.emit();
  }

  public editStage(): void {
    this.currentStage++;
  }
}
