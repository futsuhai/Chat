import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../logo/logo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, LogoComponent, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  host: {
    class: 'login-form-component'
  }
})
export class LoginFormComponent {

  @Output() switchedForm: EventEmitter<void> = new EventEmitter<void>();

  public switchForm(): void {
    this.switchedForm.emit();
  }
}
