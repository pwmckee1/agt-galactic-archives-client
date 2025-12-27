import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Image } from 'primeng/image';

@Component({
    selector: 'agt-navbar',
  imports: [RouterModule, Image],
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
