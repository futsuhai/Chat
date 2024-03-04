import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAccount } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  public currentAccount = new BehaviorSubject<IAccount | null>(null);

  constructor() {
    const storedAccount = localStorage.getItem('currentAccount');
    this.currentAccount = new BehaviorSubject<IAccount | null>(storedAccount ? JSON.parse(storedAccount) : null);
  }

  public setCurrentAccount(account: IAccount): void {
    this.currentAccount.next(account);
    localStorage.setItem('currentAccount', JSON.stringify(account));
  }

  public getCurrentAccount(): IAccount {
    const storedAccount = localStorage.getItem('currentAccount');
    return storedAccount ? JSON.parse(storedAccount) : null;
  }

  public logout(): void {
    localStorage.removeItem('currentAccount');
    this.currentAccount.next(null);
  }
}
