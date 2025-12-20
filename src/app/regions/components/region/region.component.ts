import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUpsertRegion } from '@regions/models/upsert-region';
import {
  TerminalCommunicationComponent
} from '@shared/components/terminal-communication/terminal-communication.component';
import { FormHelpers } from '@shared/helpers/form-helpers';
import { IRegion } from '@regions/models/region';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { RegionService } from '@regions/services/region.service';
import { ApiResponse } from '@shared/models/application/api-response';
import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';
import { GameModeTypes } from '@shared/models/in-game/game-mode-types';
import { GamePlatformTypes } from '@shared/models/in-game/game-platform-types';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { Image, ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import moment from 'moment';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'agt-region',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BreadcrumbModule,
    RouterModule,
    Image,
    ButtonModule,
    InputTextModule,
    TerminalCommunicationComponent,
    Select,
    FloatLabel,
    FloatLabelModule,
    InputNumberModule,
    DatePickerModule,
    TextareaModule,
    FileUploadModule,
    ImageModule,
    FileUpload,
  ],
  providers: [RegionService, ToastrService],
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss'
})
export class RegionComponent implements OnInit {
  regionForm: FormGroup;
  regionId: string;
  currentRegion: IRegion;
  isReadOnly: boolean = false;
  consoleText: string = '';
  breadcrumbItems: MenuItem[] | undefined
  home: MenuItem | undefined;
  galaxyTypes: string[] = Object.keys(GalaxyTypes);
  gamePlatformTypes: string[] = Object.keys(GamePlatformTypes);
  gameModeTypes: string[] = Object.keys(GameModeTypes);
  maxDate = moment().toDate();
  minDate = moment('9/9/2016').toDate();

  private destroyRef = inject(DestroyRef);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private regionService: RegionService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: ['/'] };
    this.createFormGroup();

    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: Params) => {
        if (params.regionId) {
          this.regionId = params.regionId;
          this.isReadOnly = true;
          this.fetchRegion();
        } else {
          this.regionId = null;
          this.isReadOnly = false;
          this.regionForm.enable();
        }
        this.updateBreadcrumbs();
      });
  }

  updateBreadcrumbs(): void {
    this.breadcrumbItems = [
      { label: 'Regions', routerLink: '/regions' },
      { label: this.regionId ? (this.isReadOnly ? 'Region Details' : 'Edit Archive') : 'New Survey' },
    ];

    // Construct the string for the typewriter effect
    const idText = this.regionId || 'NEW_RECORD';
    const accessText = this.isReadOnly ? 'READ_ONLY' : 'READ_WRITE';
    this.consoleText = ` DATABASE_QUERY // ID: ${idText} // ACCESS_LEVEL: ${accessText}`;
  }

  fetchRegion(): void {
    this.regionService.getRegionById(this.regionId).subscribe((res: ApiResponse<IRegion>) => {
      if (res.success) {
        console.log('res', res)
        this.setRegion(res.response);
      } else {
        this.toastr.error(res.messages[0]);
      }
    });
  }

  createFormGroup(): void {
    this.regionForm = this.formBuilder.group({
      surveyedBy: new FormControl(null, Validators.required),
      galaxy: new FormControl(null, Validators.required),
      regionName: new FormControl(null, Validators.required),
      legacyName: new FormControl(null),
      civilization: new FormControl(null),
      regionAge: new FormControl(null),
      galacticCoordinates: new FormControl(null, FormHelpers.getGalacticCoordinateValidator),
      gameRelease: new FormControl(null, Validators.required),
      gamePlatform: new FormControl(null),
      gameMode: new FormControl(null),
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

  setRegion(region: IRegion): void {
    this.currentRegion = region;
    console.log(region);
    this.regionForm.patchValue(region);
    if (this.isReadOnly) {
      this.regionForm.disable();
    }
  }

  toggleEdit(): void {
    this.isReadOnly = !this.isReadOnly;
    if (this.isReadOnly) {
      this.regionForm.disable();
      if (this.currentRegion) {
        this.regionForm.patchValue(this.currentRegion);
      }
    } else {
      this.regionForm.enable();
    }
    this.updateBreadcrumbs();
  }

  clearForm(): void {
    this.regionForm.reset();
  }

  save(): void {
    if (this.regionForm.valid) {
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

      this.regionService.upsertRegion(regionEntry)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res: ApiResponse<IRegion>) => {
          if (res.success) {
            this.toastr.success('Region saved successfully!');
            this.router.navigate([`/regions/${ res.response.regionId }`]);
          }
        });
    }
  }
}
