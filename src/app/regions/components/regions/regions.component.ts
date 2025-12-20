import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegionSearch } from '@regions/models/region-search';
import { RegionService } from '@regions/services/region.service';
import { IRegion } from '@regions/models/region';
import { ApiResponse } from '@shared/models/application/api-response';
import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';
import { Button } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { PrimeNG } from 'primeng/config';
import { FloatLabel } from 'primeng/floatlabel';
import { Image } from 'primeng/image';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputText } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
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
    CardModule,
    NgOptimizedImage,
    InputGroup,
    InputGroupAddon,
    InputText,
    ButtonGroup,
    MultiSelectModule,
    CheckboxModule,
  ],
  providers: [RegionService],
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.scss'
})
export class RegionsComponent implements OnInit {
  galaxyForm: FormGroup
  regions: IRegion[] = [];
  selectedSearchFields: string[] = [];
  isLoading = false;
  galaxyTypes: string[] = Object.keys(GalaxyTypes);
  galaxyControl = new FormControl(GalaxyTypes.Euclid);
  availableSearchFields: string[] = [
    'Region Name',
    'Surveyed By',
    'Discovered By',
    'Civilization',
    'Game Release',
    'Game Mode',
    'Game Platform',
  ];

  private destroyRef = inject(DestroyRef);

  constructor(
    private primeng: PrimeNG,
    private regionService: RegionService,
  ) {
  }

  ngOnInit(): void {
    console.log('search fields:', this.selectedSearchFields);
    this.primeng.ripple.set(true);
    this.galaxyForm = new FormGroup({
      galaxy: this.galaxyControl,
      searchFields: new FormControl(null),
      name: new FormControl(null),
      surveyedBy: new FormControl(null),
      discoveredBy: new FormControl(null),
      civilization: new FormControl(null),
      gameRelease: new FormControl(null),
      gameMode: new FormControl(null),
      gamePlatform: new FormControl(null),
    })
    this.galaxyControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((galaxy) => this.searchRegions(galaxy));

    this.searchRegions(GalaxyTypes.Euclid);

    this.galaxyForm.controls.searchFields.valueChanges.
      pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((selectedFields: string[]) => this.selectedSearchFields = selectedFields);
  }

  protected search(): void {
    const galaxy = this.galaxyForm.get('galaxy').value;
    const regionName = this.galaxyForm.get('name').value;
    const surveyedBy = this.galaxyForm.get('surveyedBy').value;
    const civilization = this.galaxyForm.get('civilization').value;
    this.searchRegions(galaxy, regionName, surveyedBy, civilization);
  }

  protected clearSearchValues() {
    this.galaxyForm.get('name').setValue(null);
    this.galaxyForm.get('surveyedBy').setValue(null);
    this.galaxyForm.get('discoveredBy').setValue(null);
    this.galaxyForm.get('civilization').setValue(null);
    this.galaxyForm.get('gameRelease').setValue(null);
    this.galaxyForm.get('gameMode').setValue(null);
    this.galaxyForm.get('gamePlatform').setValue(null);
  }

  private searchRegions(
    galaxy: string,
    regionName: string = null,
    surveyedBy: string = null,
    civilization: string = null) {
    this.isLoading = true;

    const searchRequest = new RegionSearch();
    searchRequest.galaxy = galaxy as GalaxyTypes;
    searchRequest.regionName = regionName;
    searchRequest.surveyedBy = surveyedBy;
    searchRequest.civilization = civilization;
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
