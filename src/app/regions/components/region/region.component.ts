
import {} from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUpsertRegion } from '@regions/models/upsert-region';
import { FormHelpers } from '@shared/helpers/form-helpers';
import { IRegion } from '@regions/models/region';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RegionService } from '@regions/services/region.service';
import { ApiResponse } from '@shared/models/application/api-response';
import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';
import { ToastrService } from 'ngx-toastr';
import { mergeMap, skipWhile, Subscription } from 'rxjs';
import moment from 'moment';

@Component({
    selector: 'agt-region',
    imports: [ReactiveFormsModule, FormsModule],
    providers: [RegionService, ToastrService],
    templateUrl: './region.component.html',
    styleUrl: './region.component.scss'
})
export class RegionComponent implements OnInit, OnDestroy {
  regionForm: FormGroup;
  regionId: string;
  currentRegion: IRegion;
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private regionService: RegionService,
    private toastr: ToastrService,
  ) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.subscriptions.push(this.route.params
      .pipe(
        skipWhile((params: Params) => !params.regionId),
        mergeMap((params: Params) => {
          this.regionId = params.regionId;
          return this.regionService.getRegionById(this.regionId);
        })
      )
      .subscribe((res: ApiResponse<IRegion[]>) => {
        if (res.success) {
          this.setRegion(res.response[0]);
        } else {
          this.toastr.error(res.messages[0]);
        }
      }));
  }

  createFormGroup(): void{
    this.regionForm = this.formBuilder.group({
      surveyedBy: new FormControl(null, Validators.required),
      galaxy: new FormControl(null, Validators.required),
      regionName: new FormControl(null, Validators.required),
      legacyName: new FormControl(null),
      regionAge: new FormControl(null),
      galacticCoordinates: new FormControl(null, FormHelpers.getGalacticCoordinateValidator),
      gameRelease: new FormControl(null, Validators.required),
      gamePlatform: new FormControl(null),
      surveyDate: new FormControl(null, Validators.required),
      earliestKnownSurveyor: new FormControl(null),
      latestKnownSurveyor: new FormControl(null),
      summaryNotes: new FormControl(null),
      locationNotes: new FormControl(null),
      civilizedSpaceNotes: new FormControl(null),
      lowestKnownPhantomSystem: new FormControl(null),
      wikiLink: new FormControl(null),
      legacyWikiLink: new FormControl(null),
      externalLink: new FormControl(null),
      videoLink: new FormControl(null),
    });
  }

  setRegion(region: IRegion): void{
    this.currentRegion = region;
    this.regionForm.patchValue(region);
  }

  save(): void{
    if(this.regionForm.valid){
      const regionEntry: IUpsertRegion = {
        surveyedBy: this.regionForm.get('surveyedBy').value,
        surveyDate: moment(this.regionForm.get('surveyedBy').value),
        galaxy: this.regionForm.get('galaxy').value as GalaxyTypes,
        regionName: this.regionForm.get('regionName').value,
        legacyName: this.regionForm.get('legacyName').value,
        regionAge: this.regionForm.get('regionAge').value,
        galacticCoordinates: this.regionForm.get('galacticCoordinates').value,
        gameRelease: this.regionForm.get('gameRelease').value,
        gamePlatform: this.regionForm.get('gamePlatform').value,
        earliestKnownSurveyor: this.regionForm.get('earliestKnownSurveyor').value,
        latestKnownSurveyor: this.regionForm.get('latestKnownSurveyor').value,
        summaryNotes: this.regionForm.get('summaryNotes').value,
        locationNotes: this.regionForm.get('locationNotes').value,
        civilizedSpaceNotes: this.regionForm.get('civilizedSpaceNotes').value,
        lowestKnownPhantomSystem: this.regionForm.get('lowestKnownPhantomSystem').value,
        wikiLink: this.regionForm.get('wikiLink').value,
        legacyWikiLink: this.regionForm.get('legacyWikiLink').value,
        externalLink: this.regionForm.get('externalLink').value,
        videoLink: this.regionForm.get('videoLink').value,
      };

      this.subscriptions.push(this.regionService.upsertRegion(regionEntry)
        .subscribe((res: ApiResponse<IRegion>) => {
          if (res.success) {
            this.toastr.success('Region saved successfully!');
            this.router.navigate([`/regions/${res.response.regionId}`]);
          }
        }));
    }
  }
}
