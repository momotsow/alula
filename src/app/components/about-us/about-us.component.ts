import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';

interface UserData {
  firstName: string;
  email: string;
}
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  userData: any = {}; // Store user data

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe((data: UserData) => {
      this.userData = data;
    });
  }
}
