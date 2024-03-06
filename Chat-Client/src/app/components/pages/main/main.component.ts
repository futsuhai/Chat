import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStateService } from 'src/app/states/auth.state';
import { IAccount } from 'src/app/models/account.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ITokens } from 'src/app/models/tokens.model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public account: IAccount;

  constructor(private authStateService: AuthStateService, private authService: AuthService, private router: Router) {
    this.account = this.authStateService.getCurrentAccount();
  }

  public logout(): void {
    this.authStateService.logout();
    this.router.navigate(['/auth']);
  }

  public refreshTokens(): void {
    this.authService.refreshTokens(this.account.tokens.refreshToken).subscribe({
      next: (tokens: ITokens) => {
        this.authStateService.refreshTokens(tokens);
        this.account = this.authStateService.getCurrentAccount();
      }
    });
  }
}
