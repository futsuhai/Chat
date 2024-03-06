import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../logo/logo.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IAccountAuth } from 'src/app/models/account-auth.model';
import { IAccount } from 'src/app/models/account.model';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/states/auth.state';
import { Subject } from 'rxjs';
import { SiteConfigState } from 'src/app/states/site-config.state';

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
export class LoginFormComponent implements OnDestroy {

  @Output() switchedForm: EventEmitter<void> = new EventEmitter<void>();
  public loginForm: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private siteConfigState: SiteConfigState,
    private authService: AuthService,
    private router: Router,
    private authStateService: AuthStateService
  ) {
    this.loginForm = this.initLoginForm();
  }

  private initLoginForm(): FormGroup {
    return new FormGroup({
      login: new FormControl<string | null>(
        "",
        [
          Validators.required,
          Validators.minLength(this.siteConfigState.MIN_LENGHT_LOGIN),
          Validators.maxLength(this.siteConfigState.MAX_LENGHT_LOGIN)
        ]
      ),
      password: new FormControl<string | null>(
        "",
        [
          Validators.required,
          Validators.pattern(this.siteConfigState.REGEXP)
        ]
      ),
      remember: new FormControl<boolean | null>(false)
    });
  }

  public submitLoginForm(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const account: IAccountAuth = {
        login: formValue.login,
        password: formValue.password
      };
      this.authService.login(account).subscribe({
        next: (account: IAccount) => {
          this.authStateService.setCurrentAccount(account);
          this.router.navigate(['/main']);
        },
        error: () => {
          this.login?.setErrors({ unauthorized: true });
          this.password?.setErrors({ unauthorized: true });
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

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
