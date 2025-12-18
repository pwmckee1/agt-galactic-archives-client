import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'agt-navbar',
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
    { label: 'Regions', route: '/regions' },
    { label: 'Star Systems', route: '/star-systems' },
    { label: 'Planets', route: '/planets' },
    { label: 'Starships', route: '/starships' },
    { label: 'Multi Tools', route: '/multi-tools' },
    { label: 'Fauna', route: '/fauna' },
    { label: 'Bases', route: '/player-bases' },
    { label: 'POIs', route: '/points-of-interest' },
    { label: 'Settlements', route: '/settlements' },
  ];
}
