import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';

interface UserData {
  firstName: string;
  email: string;
  mobileNumber: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  userData: any = {}; // Store user data

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe((data: UserData) => {
      this.userData = data;
    });
  }
}
