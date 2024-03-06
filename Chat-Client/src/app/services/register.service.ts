import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAccountAuth } from '../models/account-auth.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public currentRegistrationAccount$ = new BehaviorSubject<IAccountAuth | null>(null);

  public updateRegistrationUser(updates: IAccountAuth): void {
    const currentAccount = this.currentRegistrationAccount$.value;
    const updatedAccount: IAccountAuth = { ...currentAccount, ...updates };
    this.currentRegistrationAccount$.next(updatedAccount);
  }
}
