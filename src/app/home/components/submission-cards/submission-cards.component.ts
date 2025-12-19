import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';

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
  imports: [RouterModule, ButtonModule],
    templateUrl: './submission-cards.component.html',
    styleUrl: './submission-cards.component.scss'
})
export class SubmissionCardsComponent {
  submissionTypes: DiscoveryType[] = [
    {
      id: 'regions',
      name: 'Regions',
      icon: 'assets/img/game-entities/regions-orange.png',
      description: 'Document galactic regions',
      route: '/regions',
      color: 'primary'
    },
    {
      id: 'systems',
      name: 'Star Systems',
      icon: 'assets/img/game-entities/star-systems-orange.png',
      description: 'Catalog star systems',
      route: '/systems',
      color: 'secondary'
    },
    {
      id: 'planets',
      name: 'Planets',
      icon: 'assets/img/game-entities/planets-orange.png',
      description: 'Log planetary discoveries',
      route: '/planets',
      color: 'accent'
    },
    {
      id: 'starships',
      name: 'Starships',
      icon: 'assets/img/game-entities/starships-orange.png',
      description: 'Record starship specs',
      route: '/starships',
      color: 'primary'
    },
    {
      id: 'multitools',
      name: 'MultiTools',
      icon: 'assets/img/game-entities/multi-tools-orange.png',
      description: 'Share MultiTool finds',
      route: '/multitools',
      color: 'secondary'
    },
    {
      id: 'fauna',
      name: 'Fauna',
      icon: 'assets/img/game-entities/fauna-orange.png',
      description: 'Catalog alien creatures',
      route: '/fauna',
      color: 'accent'
    },
    {
      id: 'settlements',
      name: 'Settlements',
      icon: 'assets/img/game-entities/settlements-orange.png',
      description: 'Map settlements',
      route: '/settlements',
      color: 'primary'
    },
    {
      id: 'bases',
      name: 'Player Bases',
      icon: 'assets/img/game-entities/player-bases-orange.png',
      description: 'Publish your bases',
      route: '/bases',
      color: 'secondary'
    },
    {
      id: 'poi',
      name: 'Points of Interest',
      icon: 'assets/img/game-entities/poi-orange.png',
      description: 'Mark special locations',
      route: '/poi',
      color: 'accent'
    }
  ];
}
