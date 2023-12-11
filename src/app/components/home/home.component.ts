import { NgClass, NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  IsMenuOpen = false;
  hamburgerMenu = '../assets/hamburger.png';
  heroImage = '../assets/landing-img.png';
  memberImage = '../assets/jay.png';
  memberImage2 = '../assets/jane.png';
  memberImage3 = '../assets/doe.png';
  bottomImage = '../assets/bottom-img.png';

  toggleMenu() {
    this.IsMenuOpen = !this.IsMenuOpen;
  }

  bottomArray = [
    {
      title: 'Landing Page',
    },
    {
      title: 'Ecommerce',
    },
    {
      title: 'Blogs',
    },
    {
      title: 'Portfolio',
    },
    {
      title: 'Hiring',
    },
  ];
}
