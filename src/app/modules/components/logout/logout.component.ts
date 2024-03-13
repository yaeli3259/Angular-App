import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  successMessage: string;
  
  constructor(private router: Router) { 
    this.successMessage = 'Logout successful.';
    
    // Remove user details from sessionStorage upon logout
    sessionStorage.removeItem('users');

    // Redirect to the home page after a delay
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000); // 2 seconds delay before redirection
  }
}
