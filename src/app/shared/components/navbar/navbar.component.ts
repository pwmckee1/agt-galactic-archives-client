import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  navItems = [
    { label: 'Home', route: '/' },
    { label: 'Events Calendar', route: '/events' },
    { label: 'About', route: '/about' },
    { label: 'Team', route: '/team' },
    { label: 'Contribute', route: '/contribute' },
    { label: 'Galactic Archives', route: '/archives' },
    { label: 'Engage', route: '/engage' }
  ];
}
