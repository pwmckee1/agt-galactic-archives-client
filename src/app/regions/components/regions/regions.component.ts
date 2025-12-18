import {} from '@angular/common/http';
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegionSearch } from '@regions/models/region-search';
import { RegionService } from '@regions/services/region.service';
import { IRegion } from '@regions/models/region';
import { ApiResponse } from '@shared/models/application/api-response';
import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';

@Component({
  selector: 'agt-regions',
  standalone: true,
  imports: [CommonModule, RouterModule, 
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule, ReactiveFormsModule],
  providers: [RegionService],
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.css'
})
export class RegionsComponent implements OnInit {
  regions: IRegion[] = [];
  isLoading = false;
  galaxyTypes: string[] = Object.keys(GalaxyTypes);
  galaxyControl = new FormControl(GalaxyTypes.Euclid);

  private destroyRef = inject(DestroyRef);

  constructor(private regionService: RegionService) {
  }

  ngOnInit(): void {
    this.galaxyControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((galaxy) => this.loadRegions(galaxy));

    this.loadRegions(GalaxyTypes.Euclid);
  }

  private loadRegions(galaxy: string) {
    this.isLoading = true;

    const searchRequest = new RegionSearch();
    searchRequest.galaxy = galaxy as GalaxyTypes;
    this.regionService.getRegions(searchRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: ApiResponse<IRegion[]>) => {
        if (res.success) {
          this.regions = res.response;
        }
        this.isLoading = false;
      });
  }
}
