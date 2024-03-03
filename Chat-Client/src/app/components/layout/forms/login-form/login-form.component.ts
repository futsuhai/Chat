import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../logo/logo.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteConfigState } from 'src/app/utils/site-state-config';
import { AuthService } from 'src/app/services/auth.service';
import { IAccountAuth } from 'src/app/models/account-auth.model';
import { IAccount } from 'src/app/models/account.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, LogoComponent, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  host: {
    class: 'login-form-component'
  }
})
export class LoginFormComponent {

  @Output() switchedForm: EventEmitter<void> = new EventEmitter<void>();
  public loginForm: FormGroup;

  constructor(private siteStateConfig: SiteConfigState, private authService: AuthService) {
    this.loginForm = this.initLoginForm();
  }

  private initLoginForm(): FormGroup {
    return new FormGroup({
      login: new FormControl<string | null>(
        "",
        [
          Validators.required,
          Validators.minLength(this.siteStateConfig.MIN_LENGHT_LOGIN),
          Validators.maxLength(this.siteStateConfig.MAX_LENGHT_LOGIN)
        ]
      ),
      password: new FormControl<string | null>(
        "",
        [
          Validators.required,
          Validators.pattern(this.siteStateConfig.REGEXP)
        ]
      ),
      remember: new FormControl<boolean | null>(false)
    });
  }

  public submitLoginForm(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      console.log(formValue);
      const user: IAccountAuth = {
        login: formValue.login,
        password: formValue.password
      };
      this.authService.login(user).subscribe({
        next: (account: IAccount) => {
          console.log("Logged successfully", account);
        }
      });
    }
  }

  public switchForm(): void {
    this.switchedForm.emit();
  }

  public get login(): AbstractControl | null {
    return this.loginForm.get("login");
  }

  public get password(): AbstractControl | null {
    return this.loginForm.get("password");
  }

  public get remember(): AbstractControl | null {
    return this.loginForm.get("remember");
  }
}
