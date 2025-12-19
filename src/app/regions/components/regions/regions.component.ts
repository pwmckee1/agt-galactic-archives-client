import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegionSearch } from '@regions/models/region-search';
import { RegionService } from '@regions/services/region.service';
import { IRegion } from '@regions/models/region';
import { ApiResponse } from '@shared/models/application/api-response';
import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PrimeNG } from 'primeng/config';
import { Image } from 'primeng/image';
import { Select, SelectModule } from 'primeng/select';

@Component({
  selector: 'agt-regions',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SelectModule,
    Select,
    Button,
    Image,
    CardModule],
  providers: [RegionService],
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.scss'
})
export class RegionsComponent implements OnInit {
  galaxyForm: FormGroup
  regions: IRegion[] = [];
  isLoading = false;
  galaxyTypes: string[] = Object.keys(GalaxyTypes);
  galaxyControl = new FormControl(GalaxyTypes.Euclid);

  private destroyRef = inject(DestroyRef);

  constructor(
    private primeng: PrimeNG,
    private regionService: RegionService,
  ) {
  }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    this.galaxyForm = new FormGroup({
      galaxy: this.galaxyControl
    })
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
