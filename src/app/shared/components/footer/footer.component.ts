import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'agt-footer',
    imports: [RouterModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerLinks = [
    { label: 'AGT', externalUrl: 'https://www.nms-agt.com/alliance-of-galactic-travellers' },
    { label: 'Home', route: '' },
    { label: 'About', route: 'about' },
    { label: 'Team', externalUrl: 'https://www.nms-agt.com/team' },
    { label: 'Contribute', externalUrl: 'https://www.nms-agt.com/contribute' },
    { label: 'Engage', externalUrl: 'https://www.nms-agt.com/engage' },
    { label: 'Terms', externalUrl: 'https://www.nms-agt.com/terms' },
    { label: 'Support', externalUrl: 'https://www.nms-agt.com/support' },
    { label: 'Copyright', externalUrl: 'https://www.nms-agt.com/terms/copyright' },
  ];
}
