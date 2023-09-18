import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
})
export class PersonalDetailsComponent implements OnInit {
  personalDetailsForm!: FormGroup;
  userData: any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userData = this.userService.getUserData();

    this.personalDetailsForm = this.fb.group({
      firstName: [this.userData.firstName],
      lastName: [this.userData.lastName],
      dateOfBirth: [this.userData.dateOfBirth],
      identityNumber: [this.userData.identityNumber],
      mobileNumber: [this.userData.mobileNumber],
      countryCode: [this.userData.countryCode],
      gender: [this.userData.gender],
      maritalStatus: [this.userData.maritalStatus],
      address: this.fb.group({
        line1: [this.userData.address.line1],
        line2: [this.userData.address.line2],
        line3: [this.userData.address.line3],
        suburb: [this.userData.address.suburb],
        city: [this.userData.address.city],
        postalCode: [this.userData.address.postalCode],
        country: [this.userData.address.country],
      }),
    });
  }

  onSubmit() {
    if (this.personalDetailsForm.valid) {
      const updatedUserData = this.personalDetailsForm.value;

      this.userService.updateUserData(updatedUserData);

    }
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}
