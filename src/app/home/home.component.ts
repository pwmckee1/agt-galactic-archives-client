import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivitiesComponent } from './components/activities/activities.component';
import { BannerComponent } from './components/banner/banner.component';
import { MissionComponent } from './components/mission/mission.component';
import { MonthlyShowcaseComponent } from './components/monthly-showcase/monthly-showcase.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, BannerComponent, MissionComponent, ActivitiesComponent, MonthlyShowcaseComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
