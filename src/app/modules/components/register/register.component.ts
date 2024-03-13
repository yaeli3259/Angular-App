import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userName: string = '';
  newUser: User;
  existingUserMessage: string;
  successMessage: string;
  private users: User[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.newUser = new User(0, '', '', '', '');
    this.existingUserMessage = '';
    this.successMessage = '';

    // Fetch users from server
    _userService.getUserFromServer().subscribe(data => {
      this.users = data;
    });
  }

  ngOnInit(): void {
    // Subscribe to route parameters
    this.route.queryParams.subscribe(params => {
      this.userName = params['userName'] || '';
      this.newUser.name = this.userName;
    });
  }

  registerUser() {
    // Check if the user already exists based on email
    if (this.hasSameUser(this.newUser)) {
      this.existingUserMessage = 'User already exists.';
      // Redirect to all courses after 3 seconds
      setTimeout(() => {
        this.router.navigate(['/allCourses']);
      }, 3000);
    } else {
      // Add the user
      this.addUser(this.newUser);
      // Save user details in sessionStorage
      this.saveUserInSessionStorage(this.newUser);
      this.successMessage = 'Registration successful!';
      // You can also clear the input fields after successful registration
      this.newUser = new User(0, '', '', '', '');
      // Redirect to all courses after 3 seconds
      setTimeout(() => {
        this.router.navigate(['/allCourses']);
      }, 3000);
    }
  }

  hasSameUser(user: User): boolean {
    return this.users.some(u =>
      u.name === user.name &&
      u.address === user.address &&
      u.mail === user.mail &&
      u.password === user.password
    );
  }

  // Method to check if a user already exists
  userExists(username: string): boolean {
    return this.users.some(u => u.name === username);
  }

  // Method to add a new user
  addUser(user: User): void {
    this.users.push(user);
    this._userService.postUserToServer(this.users).subscribe(data => {
      if (data) {
        alert('save success');
      }
    });
  }

  // Method to save user details in sessionStorage
  saveUserInSessionStorage(user: User): void {
    // Retrieve existing users from sessionStorage if any
    const existingUsersStr = sessionStorage.getItem('users');
    let existingUsers: User[] = [];
    if (existingUsersStr) {
      existingUsers = JSON.parse(existingUsersStr);
    }
    // Add the new user to existing users
    existingUsers.push(user);
    // Save updated users in sessionStorage

    sessionStorage.setItem('users', JSON.stringify(existingUsers));
  }
}
