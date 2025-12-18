import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegionSearch } from '@regions/models/region-search';
import { RegionService } from '@regions/services/region.service';
import { IRegion } from '@regions/models/region';
import { ApiResponse } from '@shared/models/application/api-response';
import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'agt-regions',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [RegionService],
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.css'
})
export class RegionsComponent implements OnInit, OnDestroy {
  regions: IRegion[] = [];
  isLoading = true;
  galaxyTypes: string[] = Object.keys(GalaxyTypes);
  selectedGalaxy: string = GalaxyTypes.Euclid;
  subscriptions: Subscription[] = []

  constructor(private regionService: RegionService) {}

  ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

  ngOnInit(): void {
    this.loadRegions();
  }

  private loadRegions() {
    const searchRequest = new RegionSearch();
    searchRequest.galaxy = this.selectedGalaxy as GalaxyTypes;
    this.subscriptions.push(this.regionService.getRegions(searchRequest)
      .subscribe((res: ApiResponse<IRegion[]>) => {
        if (res.success) {
          this.regions = res.response;
        }
        this.isLoading = false;
      }));
  }
}
