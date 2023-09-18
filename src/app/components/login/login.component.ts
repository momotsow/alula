import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: any = {
    email: '',
    password: '',
  };
  loginMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['/home']);
      } else {
        // Display the login message to the user
        this.loginMessage = response.message;
      }
    });
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }

}
