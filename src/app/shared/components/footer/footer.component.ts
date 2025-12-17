import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'agt-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerLinks = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Team', route: '/team' },
    { label: 'Contribute', route: '/contribute' },
    { label: 'Galactic Archives', route: '/archives' },
    { label: 'Engage', route: '/engage' },
    { label: 'AGT NAVI', route: '/navi' },
    { label: 'Terms', route: '/terms' },
    { label: 'Support', route: '/support' },
    { label: 'Copyright', route: '/copyright' }
  ];
}
