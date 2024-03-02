import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteConfigState } from 'src/app/utils/site-state-config';
import { RegisterService } from 'src/app/services/register.service';
import { IUserAuth } from 'src/app/models/user-auth.model';

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
  public registerBasicForm: FormGroup;
  public savedUser!: IUserAuth;

  constructor(private siteStateConfig: SiteConfigState, private registerService: RegisterService) {
    if (this.registerService.currentRegistrationUser.value !== null) {
      this.savedUser = this.registerService.currentRegistrationUser.value; 
      this.registerBasicForm = this.initSavedRegisterBasicForm();
    } else {
      this.registerBasicForm = this.initRegisterBasicForm();
    }
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
      age: new FormControl<string | null>(
        this.savedUser.age || "",
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

  private initRegisterBasicForm(): FormGroup {
    return new FormGroup({
      login: new FormControl<string | null>(
        "",
        [
          Validators.required,
          Validators.minLength(this.siteStateConfig.MIN_LENGHT_LOGIN),
          Validators.maxLength(this.siteStateConfig.MAX_LENGHT_LOGIN)
        ]
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
      age: new FormControl<string | null>(
        "",
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
      const user: IUserAuth = {
        login: formValue.login,
        email: formValue.email,
        name: formValue.name,
        surname: formValue.surname,
        city: formValue.city,
        age: formValue.age,
        password: formValue.password
      };
      this.registerService.updateRegistrationUser(user);
      this.incrementStage.emit();
    }
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
