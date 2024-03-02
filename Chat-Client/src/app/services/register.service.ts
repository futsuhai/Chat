import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserAuth } from '../models/user-auth.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public currentRegistrationUser = new BehaviorSubject<IUserAuth | null>(null);

  public updateRegistrationUser(updates: IUserAuth): void {
    const currentUser = this.currentRegistrationUser.value;
    const updatedUser: IUserAuth = { ...currentUser, ...updates };
    this.currentRegistrationUser.next(updatedUser);
  }
}
