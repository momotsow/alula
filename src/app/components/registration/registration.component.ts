import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: any = {};
  registrationMessage: string | null = null;
  registrationForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  register() {
    debugger;
    if (this.registrationForm.valid) {
      const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;

      if (password === confirmPassword) {
        this.authService.register(this.user).subscribe((response) => {
          if (response.success) {
            this.router.navigate(['/login']);
          } else {
            this.registrationMessage = response.message;
          }
        });
      } else {
        // Passwords don't match
        this.registrationMessage = 'Passwords do not match.';
      }
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
