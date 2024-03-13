// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from '../../services/user.service';
// import { User } from '../../models/user.model';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';
//   errorMessage: string = '';
//   private users: User[] = [];
//   showCourseInput: boolean = false;

//   constructor(private _userService: UserService, private router: Router) {
  
//     //server
//     _userService.getUserFromServer().subscribe(data => {
//       this.users = data;
//     })
//   }

//   login() {
//     if (this.userExists(this.username)) {
//       if (this.validatePassword(this.username, this.password)) {
//         // Successful login - navigate to AllCoursesComponent
//         this.router.navigate(['/allCourses']);
//       } else {
//         // Password is incorrect
//         this.errorMessage = 'Incorrect password. Please try again.';
//       }
//     } else {
//       // User does not exist - navigate to RegisterComponent
//       this.router.navigate(['/register'],{ queryParams: { userName: this.username } });
//     }
//   }
 
//   hasSameUser(user: User): boolean {
//     return this.users.some(u => 
//       u.name === user.name && 
//       u.address === user.address && 
//       u.mail === user.mail && 
//       u.password === user.password
//     );
//   }
//   // Method to check if a user already exists
//   userExists(username: string): boolean {
//     return this.users.some(u => u.name === username);
//   }

//   // Method to check if the password is correct for the user
//   validatePassword(username: string, password: string): boolean {
//     const user = this.users.find(u => u.name === username);
//     return user ? user.password === password : false;
//   }

//   // Method to add a new user
//   addUser(user: User): void {
//     this.users.push(user);
//     this._userService.postUserToServer(this.users).subscribe(data=>{
//       if(data)
//       alert("save success")
//      });

//   }
//   toggleCourseInput() {
//     this.showCourseInput = !this.showCourseInput;
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  private users: User[] = [];
  showCourseInput: boolean = false;
    lecturer:boolean=false;
  constructor(private _userService: UserService, private router: Router) {
    // Retrieve users from sessionStorage if available
    const usersStr = sessionStorage.getItem('users');
    if (usersStr) {
      this.users = JSON.parse(usersStr);
    } else {
      // Fetch users from server if not available in sessionStorage
      _userService.getUserFromServer().subscribe(data => {
        this.users = data;
        // Save users in sessionStorage
        sessionStorage.setItem('users', JSON.stringify(this.users));
      });
    }
  }

  login() {
    if (this.userExists(this.username)) {
      if (this.validatePassword(this.username, this.password)) {
        // Successful login - navigate to AllCoursesComponent
        this.router.navigate(['/allCourses']);
      } else {
        // Password is incorrect
        this.errorMessage = 'Incorrect password. Please try again.';
      }
      if (this.showCourseInput) {
        const userStr = sessionStorage.getItem(this.username);

        if (userStr) {
            // Parse the user object
            const user: User = JSON.parse(userStr);
    
            // Modify the user object by adding the lecturer field
            const modifiedUser = { ...user, lecturer: true };
    
            // Convert the modified user object to JSON string
            const modifiedUserStr = JSON.stringify(modifiedUser);
    
            // Save the modified user object back to session storage
            sessionStorage.setItem(this.username, modifiedUserStr);
        }
    }
    } else {
      // User does not exist - navigate to RegisterComponent
      this.router.navigate(['/register'],{ queryParams: { userName: this.username } });
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

  // Method to check if the password is correct for the user
  validatePassword(username: string, password: string): boolean {
    const user = this.users.find(u => u.name === username);
    return user ? user.password === password : false;
  }

  // Method to add a new user
  addUser(user: User): void {
    if (this.showCourseInput) {
      const newUser = { ...user, lecturer: true };
      const userStr = JSON.stringify(newUser);  
      sessionStorage.setItem('user', userStr);
  } else {
      const userStr = JSON.stringify(user); 
      sessionStorage.setItem('user', userStr);
  }
    this.users.push(user);
    if(this.lecturer=true)
    sessionStorage.setItem('lecturer', JSON.stringify(this.users));
  else
    sessionStorage.setItem('users', JSON.stringify(this.users));
    this._userService.postUserToServer(this.users).subscribe(data=>{
      if(data)
        alert("save success")
    });
  }

  toggleCourseInput() {
    this.showCourseInput = !this.showCourseInput;
    this.lecturer=true;
  }
}

