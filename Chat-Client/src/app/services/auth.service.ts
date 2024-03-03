import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { IAccountAuth } from '../models/account-auth.model';
import { IAccount } from '../models/account.model';

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
}
