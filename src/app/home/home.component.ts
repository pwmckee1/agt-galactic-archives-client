
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';
import { SubmissionCardsComponent } from './components/submission-cards/submission-cards.component';
import { RecentDiscoveriesComponent } from './components/recent-discoveries/recent-discoveries.component';

@Component({
  selector: 'agt-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BannerComponent,
    SubmissionCardsComponent,
    RecentDiscoveriesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
