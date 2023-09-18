import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private userData: any = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    identityNumber: '1234567890',
    mobileNumber: '1234567890',
    countryCode: '+1',
    gender: 'Male',
    maritalStatus: 'Single',
    address: {
      line1: '123 Main St',
      line2: '',
      line3: '',
      suburb: 'Suburbia',
      city: 'Cityville',
      postalCode: '12345',
      country: 'United States',
    },
  };

  constructor() {}

  // Retrieve user data
  getUserData(): any {
    return this.userData;
  }

  // Update user data
  updateUserData(updatedUserData: any): void {
    this.userData = { ...this.userData, ...updatedUserData };

  }
}
