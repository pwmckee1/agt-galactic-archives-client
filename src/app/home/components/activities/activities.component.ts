import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Activity {
  title: string;
  icon: string;
  description: string;
  route?: string;
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
      icon: '',
      description: 'We are an exploration group.',
      route: '/regions/new'
    },
    {
      title: 'Document',
      icon: '',
      description: 'Documentation of our discoveries in our DNA.',
      route: '/archives'
    },
    {
      title: 'Engage',
      icon: '',
      description: 'We interact with all travellers, across a variety of platform media.',
      route: '/engage'
    },
    {
      title: 'Educate',
      icon: '',
      description: 'We share what we learn to benefit all travellers.',
      route: '/educate'
    }
  ];
}
