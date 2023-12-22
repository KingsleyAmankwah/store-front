import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userName!: string;
  userImage!: string;

  ngOnInit() {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    this.userName = userData.name;
    this.userImage = userData.photo;
  }
}
