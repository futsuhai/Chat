import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteConfigState } from 'src/app/utils/site-state-config';
import { RegisterService } from 'src/app/services/register.service';
import { IAccountAuth } from 'src/app/models/account-auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { IError } from 'src/app/models/error.model';
import { map, switchMap, timer } from 'rxjs';

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
  public savedUser!: IAccountAuth;

  constructor(private siteStateConfig: SiteConfigState, private registerService: RegisterService, private authService: AuthService, private formBuilder: FormBuilder) {
    if (this.registerService.currentRegistrationAccount.value !== null) {
      this.savedUser = this.registerService.currentRegistrationAccount.value;
      this.registerBasicForm = this.initSavedRegisterBasicForm();
    } else {
      //this.initTest();
      this.registerBasicForm = this.initRegisterBasicForm();
    }
    //this.authService.registerValidation("Admin").subscribe({
      //next: (error: IError) => {
       // console.log(error);
      //}
    //});
  }

  private initSavedRegisterBasicForm(): FormGroup {
    return new FormGroup({
      login: new FormControl<string | null>(
        this.savedUser.login || "",
        [
          Validators.required,
          Validators.minLength(this.siteStateConfig.MIN_LENGHT_LOGIN),
          Validators.maxLength(this.siteStateConfig.MAX_LENGHT_LOGIN)
        ]
      ),
      email: new FormControl<string | null>(
        this.savedUser.email || "",
        [
          Validators.required,
          Validators.email
        ]
      ),
      name: new FormControl<string | null>(
        this.savedUser.name || "",
        [
          Validators.required
        ]
      ),
      surname: new FormControl<string | null>(
        this.savedUser.surname || "",
        [
          Validators.required
        ]
      ),
      city: new FormControl<string | null>(
        this.savedUser.city || "",
        [
          Validators.required
        ]
      ),
      age: new FormControl<number | null>(
        this.savedUser.age || null,
        [
          Validators.required
        ]
      ),
      password: new FormControl<string | null>(
        this.savedUser.password || "",
        [
          Validators.required,
          Validators.pattern(this.siteStateConfig.REGEXP)
        ]
      )
    });
  }

  private initTest(): void {
    this.registerBasicForm = this.formBuilder.group({
      login: new FormControl<string | null>(
        "",
        [
          Validators.required,
          Validators.minLength(this.siteStateConfig.MIN_LENGHT_LOGIN),
          Validators.maxLength(this.siteStateConfig.MAX_LENGHT_LOGIN),
          this.registerValidation
        ],
      ),
      email: new FormControl<string | null>(
        "",
        [
          Validators.required,
          Validators.email
        ]
      ),
      name: new FormControl<string | null>(
        "",
        [
          Validators.required
        ]
      ),
      surname: new FormControl<string | null>(
        "",
        [
          Validators.required
        ]
      ),
      city: new FormControl<string | null>(
        "",
        [
          Validators.required
        ]
      ),
      age: new FormControl<number | null>(
        null,
        [
          Validators.required
        ]
      ),
      password: new FormControl<string | null>(
        "",
        [
          Validators.required,
          Validators.pattern(this.siteStateConfig.REGEXP)
        ]
      )
    });
  }

  private initRegisterBasicForm(): FormGroup {
    return new FormGroup({
      login: new FormControl<string | null>(
        "",
        [
          Validators.required,
          Validators.minLength(this.siteStateConfig.MIN_LENGHT_LOGIN),
          Validators.maxLength(this.siteStateConfig.MAX_LENGHT_LOGIN),
          this.registerValidation
        ],
      ),
      email: new FormControl<string | null>(
        "",
        [
          Validators.required,
          Validators.email
        ]
      ),
      name: new FormControl<string | null>(
        "",
        [
          Validators.required
        ]
      ),
      surname: new FormControl<string | null>(
        "",
        [
          Validators.required
        ]
      ),
      city: new FormControl<string | null>(
        "",
        [
          Validators.required
        ]
      ),
      age: new FormControl<number | null>(
        null,
        [
          Validators.required
        ]
      ),
      password: new FormControl<string | null>(
        "",
        [
          Validators.required,
          Validators.pattern(this.siteStateConfig.REGEXP)
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
      this.registerService.updateRegistrationUser(account);
      this.incrementStage.emit();
    }
  }

  public registerValidation(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return timer(500).pipe(
        switchMap(() =>
          this.authService.registerValidation(control.value).pipe(
            map((error: IError) => {
              if (error.type === 'Login') {
                console.log(error);
                return { duplicate: true };
              } else {
                return null;
              }
            })
          )
        )
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
