import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivitiesComponent } from './components/activities/activities.component';
import { BannerComponent } from './components/banner/banner.component';
import { DiscoveryPurposeComponent } from './components/discovery-purpose/discovery-purpose.component';
import { MissionComponent } from './components/mission/mission.component';
import { MonthlyShowcaseComponent } from './components/monthly-showcase/monthly-showcase.component';
import { RecentDiscoveriesComponent } from './components/recent-discoveries/recent-discoveries.component';
import { SubmissionCardsComponent } from './components/submission-cards/submission-cards.component';

@Component({
  selector: 'agt-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DiscoveryPurposeComponent,
    SubmissionCardsComponent,
    RecentDiscoveriesComponent,
    BannerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
