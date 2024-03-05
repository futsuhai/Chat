import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { IAccountAuth } from '../models/account-auth.model';
import { IAccount } from '../models/account.model';
import { IError } from '../models/error.model';
import { ITokens } from '../models/tokens.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get api(): string {
    return `/api/auth`;
  }

  constructor(private restService: RestService) { }

  public register(account: IAccountAuth): Observable<IAccount> {
    const endpoint: string = `${this.api}/Register`;
    return this.restService.restPOST<IAccount>(endpoint, account);
  }

  public login(account: IAccountAuth): Observable<IAccount> {
    const endpoint: string = `${this.api}/Auth`;
    return this.restService.restPUT<IAccount>(endpoint, account);
  }

  public refreshTokens(refreshToken: string): Observable<ITokens> {
    const endpoint: string = `${this.api}/RefreshTokens/${refreshToken}`;
    return this.restService.restPUT<ITokens>(endpoint);
  }

  public registerValidation(control: string): Observable<IError> {
    const endpoint: string = `${this.api}/ValidateRegistration/${control}`;
    return this.restService.restGET<IError>(endpoint);
  }
}
