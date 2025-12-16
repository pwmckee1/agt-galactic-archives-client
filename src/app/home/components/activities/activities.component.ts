import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Activity {
  title: string;
  description: string;
  route?: string;
  icon?: string;
}

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  activities: Activity[] = [
    {
      title: 'Explore',
      description: 'We are an exploration group.',
      route: '/regions/new',
      icon: 'assets/img/explore.png'
    },
    {
      title: 'Document',
      description: 'Documentation of our discoveries in our DNA.',
      route: '/archives',
      icon: 'assets/img/document.png'
    },
    {
      title: 'Engage',
      description: 'We interact with all travellers, across a variety of platform media.',
      route: '/engage',
      icon: 'assets/img/engage.png'
    },
    {
      title: 'Educate',
      description: 'We share what we learn to benefit all travellers.',
      route: '/educate',
      icon: 'assets/img/educate.png'
    }
  ];
}
