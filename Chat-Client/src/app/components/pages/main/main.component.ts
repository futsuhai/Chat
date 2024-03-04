import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { IAccount } from 'src/app/models/account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public account: IAccount;

  constructor(private authStateService: AuthStateService, private router: Router) {
    this.account = this.authStateService.getCurrentAccount();
  }

  public logout(): void {
    this.authStateService.logout();
    this.router.navigate(['/auth']);
  }
}
