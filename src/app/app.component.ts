import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './components/pages/auth-page/auth-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AuthPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'app-root-component'
  }
})
export class AppComponent {

}
