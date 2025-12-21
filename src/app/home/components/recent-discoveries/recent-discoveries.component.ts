
import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PreloaderComponent } from '@shared/components/preloader/preloader.component';

interface Discovery {
  id: string;
  type: string;
  title: string;
  submittedBy: string;
  date: string;
  icon: string;
  description: string;
  route: string;
}

@Component({
    selector: 'agt-recent-discoveries',
  imports: [RouterModule, PreloaderComponent],
    templateUrl: './recent-discoveries.component.html',
    styleUrl: './recent-discoveries.component.scss'
})
export class RecentDiscoveriesComponent {
  recentDiscoveries: Discovery[] = [
    {
      id: '1',
      type: 'Planet',
      title: 'Emerald Paradise World',
      submittedBy: 'Explorer_Nova',
      date: '2 hours ago',
      icon: '🪐',
      description: 'Lush planet with vibrant flora and abundant resources',
      route: '/planets/1'
    },
    {
      id: '2',
      type: 'Fauna',
      title: 'Crystal-Back Reptoid',
      submittedBy: 'Naturalist_Apex',
      date: '5 hours ago',
      icon: '🦖',
      description: 'Rare crystalline creature discovered in caves',
      route: '/fauna/2'
    },
    {
      id: '3',
      type: 'Settlement',
      title: 'Trading Post Delta',
      submittedBy: 'Mapper_Atlas',
      date: '1 day ago',
      icon: '🏘️',
      description: 'Thriving settlement with excellent trade opportunities',
      route: '/settlements/3'
    },
    {
      id: '4',
      type: 'Player Base',
      title: 'The Sanctuary',
      submittedBy: 'Builder_Prime',
      date: '2 days ago',
      icon: '🏗️',
      description: 'Community hub and resource processing facility',
      route: '/bases/4'
    },
    {
      id: '5',
      type: 'Point of Interest',
      title: 'Ancient Monolith Site',
      submittedBy: 'Archaeologist_Zero',
      date: '3 days ago',
      icon: '📍',
      description: 'Mysterious alien structure with archaeological significance',
      route: '/poi/5'
    },
    {
      id: '6',
      type: 'Region',
      title: 'Veils of Nebula',
      submittedBy: 'Cartographer_Sky',
      date: '4 days ago',
      icon: '🌍',
      description: 'Spectacular region with unique stellar phenomena',
      route: '/regions/6'
    }
  ];
}
