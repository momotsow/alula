import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alula';
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
    // You can also navigate to the login page or perform other actions here
  }

}
