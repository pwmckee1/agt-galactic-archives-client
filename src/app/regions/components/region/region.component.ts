import { NgClass } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegionInputFormFieldTypes } from '@regions/models/region-input-form-field-types';
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
import { IGameRelease } from '@shared/models/in-game/game-release';
import { GameReleaseService } from '@shared/services/game-metadata/game-release.service';
import { ToastrService } from 'ngx-toastr';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionModule,
  AccordionPanel,
  AccordionStyle
} from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { Bind } from 'primeng/bind';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Image, ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import moment from 'moment';
import { TextareaModule } from 'primeng/textarea';
import { combineLatest } from 'rxjs';

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
    FloatLabelModule,
    InputNumberModule,
    DatePickerModule,
    TextareaModule,
    FileUploadModule,
    ImageModule,
    NgClass,
    AccordionModule,
    AccordionHeader,
    AccordionPanel,
    AccordionContent,
  ],
  providers: [
    RegionService,
    ToastrService,
    GameReleaseService,
    Accordion,
    AccordionStyle,
    AccordionPanel,
    Bind],
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss'
})
export class RegionComponent implements OnInit {
  regionForm: FormGroup;
  regionId: string;
  consoleText: string = '';
  requiredWarning: string = '* Indicates required question';
  isReadOnly: boolean = false;
  completedTyping: Record<string, boolean> = {};
  home: MenuItem | undefined;
  breadcrumbItems: MenuItem[] | undefined
  currentRegion: IRegion;
  gameReleases: IGameRelease[] = [];

  FormFields = RegionInputFormFieldTypes;
  activeFormField: RegionInputFormFieldTypes;
  activeFormFields: RegionInputFormFieldTypes[] = [];
  requiredFormFields: RegionInputFormFieldTypes[] = [
    RegionInputFormFieldTypes.Galaxy,
    RegionInputFormFieldTypes.RegionName,
    RegionInputFormFieldTypes.GalacticCoordinates,
    RegionInputFormFieldTypes.GalacticCoordinates,
  ];

  galaxyTypes: { name: string, label: GalaxyTypes }[] =
    Object.entries(GalaxyTypes).map(([key, value]) => ({
    name: key,
    label: value
  }));
  gamePlatformTypes: { name: string, label: GamePlatformTypes}[] =
    Object.entries(GamePlatformTypes).map(([key, value]) => ({
    name: key,
    label: value
  }));
  gameModeTypes: { name: string, label: GameModeTypes }[] =
    Object.entries(GameModeTypes).map(([key, value]) => ({
    name: key,
    label: value
  }));

  maxDate = moment().toDate();
  minDate = moment('9/9/2016').toDate();

  hasInitialStatusText: boolean = false;
  hasRequiredWarningText: boolean = false;
  hasSelectGalaxyText: boolean = false;
  hasRegionNameText: boolean = false;
  hasPhantomSystemText: boolean = false;
  hasSurveyInfoText: boolean = false;
  hasGalacticCoordinatesText: boolean = false;
  hasLegacyNameText: boolean = false;
  hasRegionAgeText: boolean = false;
  hasCivilizationText: boolean = false;
  hasGameInfoText: boolean = false;
  hasNotesText: boolean = false;
  hasLinksText: boolean = false;

  isGalaxySelected: boolean = false;
  isRegionNameEntered: boolean = false;
  isPhantomSystemEntered: boolean = false;
  isSurveyInfoEntered: boolean = false;
  isGalacticCoordinatesEntered: boolean = false;
  isLegacyNameEntered: boolean = false;
  isRegionAgeEntered: boolean = false;
  isCivilizationEntered: boolean = false;
  isGameInfoEntered: boolean = false;
  isNotesEntered: boolean = false;
  isLinksEntered: boolean = false;

  selectGalaxyText: string = 'Select_Galaxy:';
  regionNameText: string = 'Region_Name:';
  phantomSystemText: string = 'Lowest_Known_Phantom_System:';
  surveyInfoText: string = 'Surveyor_Data:';
  galacticCoordinatesText: string = 'Galactic_Coordinates:';
  legacyNameText: string = 'Legacy_Name:';
  regionAgeText: string = 'Region_Age:';
  civilizationText: string = 'Civilization:';
  gameInfoText: string = 'Game_Information:';
  notesText: string = 'Notes:';
  linksText: string = 'Links:';

  galaxySelectPlaceholder: string = 'Euclid, Hilbert Dimension, etc...';
  regionNamePlaceholder: string = 'Kitisba-Instability, etc...';
  phantomSystemPlaceholder: string = 'Skip if you are unsure';
  surveyedByPlaceholder: string = 'Surveyor Name';
  surveyDatePlaceholder: string = 'Survey Date';
  galacticCoordinatesPlaceholder: string = 'XXXX:XXXX:XXXX:XXXX';
  legacyNamePlaceholder: string = 'Legacy Name';
  regionAgePlaceholder: string = 'Region Age';
  civilizationPlaceholder: string = 'Civilization';
  gameReleasePlaceholder: string = 'Release';
  gamePlatformPlaceholder: string = 'Game Platform';
  gameModePlaceholder: string = 'Game Mode';
  summaryNotesPlaceholder: string = 'Summary Notes';
  locationNotesPlaceholder: string = 'Location Notes';
  civilizedSpaceNotesPlaceholder: string = 'Civilization Notes';
  wikiLinkPlaceholder: string = 'Wiki Link';
  legacyWikiLinkPlaceholder: string = 'Legacy Wiki Link';
  externalLinkPlaceholder: string = 'External Link';
  videoLinkPlaceholder: string = 'Video Link';

  private destroyRef = inject(DestroyRef);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private regionService: RegionService,
    private toastr: ToastrService,
    private gameReleaseService: GameReleaseService,
  ) {
  }

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: ['/'] };
    this.gameReleaseService.getGameReleases()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        if (res.success) {
          this.gameReleases = res.response;
        }
      })
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

    this.setupFormChanges();
  }

  updateBreadcrumbs(): void {
    this.breadcrumbItems = [
      { label: 'Regions', routerLink: '/regions' },
      { label: this.regionId ? (this.isReadOnly ? 'Region Details' : 'Edit Archive') : 'New Survey' },
    ];

    // Construct the string for the typewriter effect
    const idText = this.regionId || 'NEW_RECORD';
    const accessText = this.isReadOnly ? 'READ_ONLY' : 'READ_WRITE';
    this.consoleText = ` DATABASE_QUERY // ID: ${ idText } // ACCESS_LEVEL: ${ accessText } //`;
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
      galaxy: new FormControl(null, Validators.required),
      regionName: new FormControl(null, Validators.required),
      surveyedBy: new FormControl(null, Validators.required),
      surveyDate: new FormControl(null, Validators.required),
      galacticCoordinates: new FormControl(null, [Validators.required, FormHelpers.getGalacticCoordinateValidator()]),
      legacyName: new FormControl(null),
      regionAge: new FormControl(null),
      civilization: new FormControl(null),
      gameRelease: new FormControl(null, Validators.required),
      gamePlatform: new FormControl(null),
      gameMode: new FormControl(null),
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
        galaxy: this.galaxyControl.value?.name as GalaxyTypes,
        regionName: this.regionNameControl.value,
        surveyedBy: this.surveyedByControl.value,
        galacticCoordinates: this.galacticCoordinatesControl.value,
        surveyDate: moment(this.surveyDateControl.value),
        legacyName: this.legacyNameControl.value,
        regionAge: this.regionAgeControl.value,
        gameRelease: this.gameReleaseControl.value,
        gamePlatform: this.gamePlatformControl.value?.name as GamePlatformTypes,
        gameMode: this.gameModeControl.value?.name as GameModeTypes,
        summaryNotes: this.summaryNotesControl.value,
        locationNotes: this.locationNotesControl.value,
        civilizedSpaceNotes: this.civilizedSpaceNotesControl.value,
        lowestKnownPhantomSystem: this.lowestKnownPhantomSystemControl.value,
        wikiLink: this.wikiLinkControl.value,
        legacyWikiLink: this.legacyWikiLinkControl.value,
        externalLink: this.externalLinkControl.value,
        videoLink: this.videoLinkControl.value,
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

  get isNextDisabled(): boolean {
    if (!this.activeFormField) return false;

    const fieldMapping: Record<string, string[]> = {
      [RegionInputFormFieldTypes.Galaxy]: ['galaxy'],
      [RegionInputFormFieldTypes.RegionName]: ['regionName'],
      [RegionInputFormFieldTypes.SurveyInfo]: ['surveyedBy', 'surveyDate'],
      [RegionInputFormFieldTypes.GalacticCoordinates]: ['galacticCoordinates'],
      [RegionInputFormFieldTypes.GameInfo]: ['gameRelease'],
      [RegionInputFormFieldTypes.Notes]: ['summaryNotes', 'locationNotes', 'civilizedSpaceNotes'],
      // Add others if they have required fields, otherwise they default to valid
    };

    const controlsToCheck = fieldMapping[this.activeFormField] || [];
    return controlsToCheck.some(controlName => {
      const control = this.regionForm.get(controlName);
      return control ? control.invalid : false;
    });
  }

  updateActiveFormFields(event: boolean, field: RegionInputFormFieldTypes): void {
    if (event && !this.activeFormFields.includes(field)) {
      this.activeFormField = field;
      this.activeFormFields.push(field);
    }
  }

  initialStatusTypingComplete(event: boolean): void {
    this.hasInitialStatusText = event;
  }

  requiredWarningTypingComplete(event: boolean): void {
    this.hasRequiredWarningText = event;
    this.updateActiveFormFields(event, RegionInputFormFieldTypes.Galaxy);
  }

  onTypingComplete(field: RegionInputFormFieldTypes): void {
    this.completedTyping[field] = true;
  }

  searchingGalaxyTypingComplete(event: boolean): void {
    this.hasSelectGalaxyText = event;
  }

  regionNameInstructionComplete(event: boolean): void {
    this.hasRegionNameText = event;
  }

  phantomSystemInstructionComplete(event: boolean): void {
    this.hasPhantomSystemText = event;
  }

  surveyInfoTypingComplete(event: boolean): void {
    this.hasSurveyInfoText = event;
  }

  galacticCoordinatesTypingComplete(event: boolean): void {
    this.hasGalacticCoordinatesText = event;
  }

  legacyNameTypingComplete(event: boolean): void {
    this.hasLegacyNameText = event;
  }

  regionAgeTypingComplete(event: boolean): void {
    this.hasRegionAgeText = event;
  }

  civilizationTypingComplete(event: boolean): void {
    this.hasCivilizationText = event;
  }

  gameInfoTypingComplete(event: boolean): void {
    this.hasGameInfoText = event;
  }

  notesTypingComplete(event: boolean): void {
    this.hasNotesText = event;
  }

  linksTypingComplete(event: boolean): void {
    this.hasLinksText = event;
  }

  setupFormChanges(): void {
    // this.galaxyControl.valueChanges
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe((galaxy) => {
    //     if (this.galaxyControl.valid) {
    //       this.isGalaxySelected = !!galaxy?.name
    //       this.nextField();
    //     }
    //   });
    //
    // this.regionNameControl.valueChanges
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe((name) => {
    //     if (this.regionNameControl.valid) {
    //       this.isRegionNameEntered = !!name
    //       this.nextField();
    //     }
    //   });
    //
    // combineLatest([
    //   this.surveyedByControl.valueChanges,
    //   this.surveyDateControl.valueChanges
    // ])
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe(([surveyedBy, surveyDate]) => {
    //     if (this.surveyedByControl.valid && this.surveyDateControl.valid) {
    //       this.isSurveyInfoEntered = !!!!surveyedBy && !!surveyDate
    //       this.nextField();
    //     }
    //     this.isSurveyInfoEntered = !!surveyedBy && !!surveyDate
    //   });
    //
    // this.galacticCoordinatesControl.valueChanges
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe((coordinates) => {
    //     if (this.galacticCoordinatesControl.valid) {
    //       this.isGalacticCoordinatesEntered = !!coordinates
    //       this.nextField();
    //     }
    //   });
    //
    // this.gameReleaseControl.valueChanges
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe((release) => {
    //     if (this.gameReleaseControl.valid) {
    //       this.isGameInfoEntered = !!release
    //       this.gameReleaseControl.updateValueAndValidity({ emitEvent: false });
    //       console.log('game Release value', this.gameReleaseControl.value)
    //       this.nextField();
    //     }
    //   });
  }

  nextField() {
    const currentIndex = this.activeFormFields.indexOf(this.activeFormField);
    const allFormFields = Object.keys(RegionInputFormFieldTypes);
    this.activeFormField = allFormFields[currentIndex + 1] as RegionInputFormFieldTypes;
    this.activeFormFields.push(this.activeFormField);
  }

  get galaxyControl(): FormControl {
    return this.regionForm.get('galaxy') as FormControl;
  }

  get regionNameControl(): FormControl {
    return this.regionForm.get('regionName') as FormControl;
  }

  get surveyedByControl(): FormControl {
    return this.regionForm.get('surveyedBy') as FormControl;
  }

  get galacticCoordinatesControl(): FormControl {
    return this.regionForm.get('galacticCoordinates') as FormControl;
  }

  get surveyDateControl(): FormControl {
    return this.regionForm.get('surveyDate') as FormControl;
  }

  get legacyNameControl(): FormControl {
    return this.regionForm.get('legacyName') as FormControl;
  }

  get regionAgeControl(): FormControl {
    return this.regionForm.get('regionAge') as FormControl;
  }

  get gameReleaseControl(): FormControl {
    return this.regionForm.get('gameRelease') as FormControl;
  }

  get gamePlatformControl(): FormControl {
    return this.regionForm.get('gamePlatform') as FormControl;
  }

  get gameModeControl(): FormControl {
    return this.regionForm.get('gameMode') as FormControl;
  }

  get summaryNotesControl(): FormControl {
    return this.regionForm.get('summaryNotes') as FormControl;
  }

  get locationNotesControl(): FormControl {
    return this.regionForm.get('locationNotes') as FormControl;
  }

  get civilizedSpaceNotesControl(): FormControl {
    return this.regionForm.get('civilizedSpaceNotes') as FormControl;
  }

  get lowestKnownPhantomSystemControl(): FormControl {
    return this.regionForm.get('lowestKnownPhantomSystem') as FormControl;
  }

  get wikiLinkControl(): FormControl {
    return this.regionForm.get('wikiLink') as FormControl;
  }

  get legacyWikiLinkControl(): FormControl {
    return this.regionForm.get('legacyWikiLink') as FormControl;
  }

  get externalLinkControl(): FormControl {
    return this.regionForm.get('externalLink') as FormControl;
  }

  get videoLinkControl(): FormControl {
    return this.regionForm.get('videoLink') as FormControl;
  }

  get nextButtonLabel(): string {
    return this.isNextDisabled
      ? 'NEXT (Complete Required Input to Enable)'
      : 'NEXT';
  }
}
