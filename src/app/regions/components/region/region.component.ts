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
import moment, { Moment } from 'moment';
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

      this.regionService.upsertRegion(this.regionEntry)
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

    const requiredFieldMapping: Record<string, string[]> = {
      [RegionInputFormFieldTypes.Galaxy]: ['galaxy'],
      [RegionInputFormFieldTypes.RegionName]: ['regionName'],
      [RegionInputFormFieldTypes.SurveyInfo]: ['surveyedBy', 'surveyDate'],
      [RegionInputFormFieldTypes.GalacticCoordinates]: ['galacticCoordinates'],
      [RegionInputFormFieldTypes.GameInfo]: ['gameRelease'],
    };

    const controlsToCheck = requiredFieldMapping[this.activeFormField] || [];
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

  nextField() {
    const currentIndex = this.activeFormFields.indexOf(this.activeFormField);
    const allFormFields = Object.keys(RegionInputFormFieldTypes);
    this.activeFormField = allFormFields[currentIndex + 1] as RegionInputFormFieldTypes;
    this.activeFormFields.push(this.activeFormField);
  }

  get regionEntry(): IUpsertRegion {
    return {
      galaxy: this.selectedGalaxy,
      regionName: this.regionName,
      surveyedBy: this.surveyedBy,
      galacticCoordinates: this.galacticCoordinates,
      surveyDate: this.surveyDate,
      legacyName: this.legacyName,
      regionAge: this.regionAge,
      gameRelease: this.gameRelease,
      gamePlatform: this.gamePlatform,
      gameMode: this.gameMode,
      summaryNotes: this.summaryNotes,
      locationNotes: this.locationNotes,
      civilizedSpaceNotes: this.civilizedSpaceNotes,
      lowestKnownPhantomSystem: this.lowestKnownPhantomSystem,
      wikiLink: this.wikiLink,
      legacyWikiLink: this.legacyWikiLink,
      externalLink: this.externalLink,
      videoLink: this.videoLink,
    };
  }

  get selectedGalaxy(): GalaxyTypes {
    return this.regionForm.controls.galaxy.value as GalaxyTypes;
  }

  get regionName(): string {
    return this.regionForm.controls.regionName.value;
  }

  get surveyedBy(): string {
    return this.regionForm.controls.surveyedBy.value;
  }

  get surveyDate(): Moment {
    return moment(this.regionForm.controls.surveyDate.value);
  }

  get galacticCoordinates(): string {
    return this.regionForm.controls.galacticCoordinates.value;
  }

  get legacyName(): string {
    return this.regionForm.controls.legacyName.value;
  }

  get regionAge(): number {
    return this.regionForm.controls.regionAge.value;
  }

  get gameRelease(): string {
    return this.regionForm.controls.gameRelease.value;
  }

  get gamePlatform(): GamePlatformTypes {
    return this.regionForm.controls.gamePlatform.value;
  }

  get gameMode(): GameModeTypes {
    return this.regionForm.controls.gameMode.value;
  }

  get summaryNotes(): string {
    return this.regionForm.controls.summaryNotes.value;
  }

  get locationNotes(): string {
    return this.regionForm.controls.locationNotes.value;
  }

  get civilizedSpaceNotes(): string {
    return this.regionForm.controls.civilizedSpaceNotes.value;
  }

  get lowestKnownPhantomSystem(): string {
    return this.regionForm.controls.lowestKnownPhantomSystem.value;
  }

  get wikiLink(): string {
    return this.regionForm.controls.wikiLink.value;
  }

  get legacyWikiLink(): string {
    return this.regionForm.controls.legacyWikiLink.value;
  }

  get externalLink(): string {
    return this.regionForm.controls.externalLink.value;
  }

  get videoLink(): string {
    return this.regionForm.controls.videoLink.value;
  }
}
