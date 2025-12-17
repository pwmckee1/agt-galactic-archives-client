import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface DiscoveryType {
  id: string;
  name: string;
  icon: string;
  description: string;
  route: string;
  color: 'primary' | 'secondary' | 'accent';
}

@Component({
  selector: 'agt-submission-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './submission-cards.component.html',
  styleUrl: './submission-cards.component.css'
})
export class SubmissionCardsComponent {
  discoveryTypes: DiscoveryType[] = [
    {
      id: 'regions',
      name: 'Regions',
      icon: '🌍',
      description: 'Document galactic regions',
      route: '/regions',
      color: 'primary'
    },
    {
      id: 'systems',
      name: 'Star Systems',
      icon: '⭐',
      description: 'Catalog star systems',
      route: '/systems',
      color: 'secondary'
    },
    {
      id: 'planets',
      name: 'Planets',
      icon: '🪐',
      description: 'Log planetary discoveries',
      route: '/planets',
      color: 'accent'
    },
    {
      id: 'starships',
      name: 'Starships',
      icon: '🚀',
      description: 'Record starship specs',
      route: '/starships',
      color: 'primary'
    },
    {
      id: 'multitools',
      name: 'MultiTools',
      icon: '🔧',
      description: 'Share MultiTool finds',
      route: '/multitools',
      color: 'secondary'
    },
    {
      id: 'fauna',
      name: 'Fauna',
      icon: '🦖',
      description: 'Catalog alien creatures',
      route: '/fauna',
      color: 'accent'
    },
    {
      id: 'settlements',
      name: 'Settlements',
      icon: '🏘️',
      description: 'Map settlements',
      route: '/settlements',
      color: 'primary'
    },
    {
      id: 'bases',
      name: 'Player Bases',
      icon: '🏗️',
      description: 'Publish your bases',
      route: '/bases',
      color: 'secondary'
    },
    {
      id: 'poi',
      name: 'Points of Interest',
      icon: '📍',
      description: 'Mark special locations',
      route: '/poi',
      color: 'accent'
    }
  ];
}
