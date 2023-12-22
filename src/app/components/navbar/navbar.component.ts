import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userName!: string;
  userImage!: string;
  showDropdown = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    this.userName = userData.name; // Assuming 'name' is the key for the user's name
    this.userImage = userData.photo; // Assuming 'image' is the key for the user's image URL
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    sessionStorage.clear(); // Clears sessionStorage
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
    this.router.navigate(['/login']);
    // this.router.navigate(['/login']);
  }
}
