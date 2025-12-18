import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
    selector: 'agt-footer',
    imports: [RouterModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerLinks = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Team', route: '/team' },
    { label: 'Galactic Archives', route: '/archives' },
    { label: 'Terms', route: '/terms' },
    { label: 'Support', route: '/support' },
  ];
}
