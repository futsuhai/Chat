import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteConfigState } from 'src/app/states/site-config.state';
import { RegisterService } from 'src/app/services/register.service';
import { IAccountAuth } from 'src/app/models/account-auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { IError } from 'src/app/models/error.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-register-form-basic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form-basic.component.html',
  host: {
    class: 'register-form-basic'
  }
})

export class RegisterFormBasicComponent {

  @Output() incrementStage: EventEmitter<void> = new EventEmitter<void>();
  public registerBasicForm!: FormGroup;

  constructor(
    private siteConfigState: SiteConfigState,
    private registerService: RegisterService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
      this.initRegisterBasicForm(this.registerService.currentRegistrationAccount$.value);
  }

  private initRegisterBasicForm(savedAccount: IAccountAuth | null): void {
    this.registerBasicForm = this.formBuilder.group({
      login: new FormControl<string | null>(
        savedAccount?.login ? savedAccount.login : "",
        [
          Validators.required,
          Validators.minLength(this.siteConfigState.MIN_LENGHT_LOGIN),
          Validators.maxLength(this.siteConfigState.MAX_LENGHT_LOGIN),
        ],
        this.registerValidation()
      ),
      email: new FormControl<string | null>(
        savedAccount?.email ? savedAccount.email : "",
        [
          Validators.required,
          Validators.email
        ],
        this.registerValidation()
      ),
      name: new FormControl<string | null>(
        savedAccount?.name ? savedAccount.name : "",
        [
          Validators.required
        ]
      ),
      surname: new FormControl<string | null>(
        savedAccount?.surname ? savedAccount.surname : "",
        [
          Validators.required
        ]
      ),
      city: new FormControl<string | null>(
        savedAccount?.city ? savedAccount.city : "",
        [
          Validators.required
        ]
      ),
      age: new FormControl<number | null>(
        savedAccount?.age ? savedAccount.age : null,
        [
          Validators.required
        ]
      ),
      password: new FormControl<string | null>(
        savedAccount?.password ? savedAccount.password : "",
        [
          Validators.required,
          Validators.pattern(this.siteConfigState.REGEXP)
        ]
      )
    });
  }

  public submitRegisterBasicForm(): void {
    if (this.registerBasicForm.valid) {
      const formValue = this.registerBasicForm.value;
      const account: IAccountAuth = {
        login: formValue.login,
        email: formValue.email,
        name: formValue.name,
        surname: formValue.surname,
        city: formValue.city,
        age: formValue.age,
        password: formValue.password
      };
      this.registerService.updateRegistrationAccount(account);
      this.incrementStage.emit();
    }
  }

  public registerValidation(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.authService.registerValidation(control.value).pipe(
        map((error: IError) => {
          if (error.type === "Login") {
            return { duplicateLogin: true };
          }
          if (error.type === "Email") {
            return { duplicateEmail: true };
          }
          return null;
        })
      );
    };
  }

  public get login(): AbstractControl | null {
    return this.registerBasicForm.get("login");
  }

  public get email(): AbstractControl | null {
    return this.registerBasicForm.get("email");
  }

  public get name(): AbstractControl | null {
    return this.registerBasicForm.get("name");
  }

  public get surname(): AbstractControl | null {
    return this.registerBasicForm.get("surname");
  }

  public get password(): AbstractControl | null {
    return this.registerBasicForm.get("password");
  }

  public get city(): AbstractControl | null {
    return this.registerBasicForm.get("city");
  }

  public get age(): AbstractControl | null {
    return this.registerBasicForm.get("age");
  }
}
