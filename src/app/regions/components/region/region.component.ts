import { NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { IInterRegionDistance } from '@regions/models/inter-region-distance';
import { RegionInputFormFieldTypes } from '@regions/models/region-input-form-field-types';
import { IUpsertRegion } from '@regions/models/upsert-region';
import {
  InterRegionDistanceComponent
} from '@shared/components/terminal-ui/inter-region-distance/inter-region-distance.component';
import {
  TerminalCommunicationComponent
} from '@shared/components/terminal-ui/terminal-communication/terminal-communication.component';
import { FormHelpers } from '@shared/helpers/form-helpers';
import { IRegion } from '@regions/models/region';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { RegionService } from '@regions/services/region.service';
import { ApiResponse } from '@shared/models/application/api-response';
import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';
import { GameModeTypes } from '@shared/models/in-game/game-mode-types';
import { GamePlatformTypes } from '@shared/models/in-game/game-platform-types';
import { IGameRelease } from '@shared/models/in-game/game-release';
import { GameReleaseSearchRequest } from '@shared/models/in-game/game-release-search-request';
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
import { MenuItem, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { Bind } from 'primeng/bind';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Image, ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ProgressBarModule } from 'primeng/progressbar';
import { Select } from 'primeng/select';
import moment, { Moment } from 'moment';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'agt-region',
  standalone: true,
  imports: [
    AccordionContent,
    AccordionHeader,
    AccordionModule,
    AccordionPanel,
    BreadcrumbModule,
    ButtonModule,
    DatePickerModule,
    FileUploadModule,
    FloatLabelModule,
    FormsModule,
    Image,
    ImageModule,
    InputNumberModule,
    InputTextModule,
    NgClass,
    ProgressBarModule,
    ReactiveFormsModule,
    RouterModule,
    Select,
    TerminalCommunicationComponent,
    TextareaModule,
    ToastModule,
    BadgeModule,
    OverlayBadgeModule,
    InterRegionDistanceComponent,
  ],
  providers: [
    RegionService,
    ToastrService,
    GameReleaseService,
    Accordion,
    AccordionStyle,
    AccordionPanel,
    MessageService,
    Bind],
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss'
})
export class RegionComponent implements OnInit, AfterViewInit {
  @ViewChild(InterRegionDistanceComponent) interRegionDistanceComponent!: InterRegionDistanceComponent;
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
  isNewRegion: boolean = false;

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
  imageUploadText: string = 'Upload_Images:';

  galaxySelectPlaceholder: string = 'Euclid, Hilbert Dimension, etc...';
  regionNamePlaceholder: string = 'Kitisba-Instability, etc...';
  phantomSystemPlaceholder: string = 'Skip if you are unsure what this is';
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
  gameReleaseVersionNumberPlaceholder: string = 'Game Release Version Number';
  gameReleaseDatePlaceholder: string = 'Game Release Date';

  private destroyRef = inject(DestroyRef);

  files: any[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;
  maxFileSize: number = 10485760;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private regionService: RegionService,
    private toastr: ToastrService,
    private gameReleaseService: GameReleaseService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: ['/'] };
    const releaseRequest = new GameReleaseSearchRequest();
    releaseRequest.pageSize = 100;
    this.gameReleaseService.getGameReleases(releaseRequest)
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
          this.isNewRegion = false;
          this.regionId = params.regionId;
          this.isReadOnly = true;
          this.showAllForm();
          this.fetchRegion();
        } else {
          this.isNewRegion = true;
          this.regionId = null;
          this.isReadOnly = false;
          this.regionForm.enable();
        }
        this.updateBreadcrumbs();
        this.initializeTerminal();
      });
  }

  ngAfterViewInit(): void {
    this.interRegionDistanceComponent?.initializeDistances();
    this.cdr.detectChanges();
  }

  showAllForm(): void {
    const allFormFields = Object.keys(RegionInputFormFieldTypes);
    this.activeFormFields = allFormFields.map(field => field as RegionInputFormFieldTypes);
  }

  updateBreadcrumbs(): void {
    this.breadcrumbItems = [
      { label: 'Regions', routerLink: '/regions' },
      { label: this.regionId ? (this.isReadOnly ? 'Region Details' : 'Edit Archive') : 'New Survey' },
    ];
  }

  initializeTerminal(): void {
    const idText = this.regionId || 'NEW_RECORD';
    const accessText = this.isReadOnly ? 'READ_ONLY' : 'READ_WRITE';
    this.consoleText = ` DATABASE_QUERY // ID: ${ idText } // ACCESS_LEVEL: ${ accessText } //`;
  }

  fetchRegion(): void {
    this.regionService.getRegionById(this.regionId).subscribe((res: ApiResponse<IRegion>) => {
      if (res.success) {
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
      gameReleaseVersionNumber: new FormControl(null),
      gameReleaseDate: new FormControl(null),
      summaryNotes: new FormControl(null),
      locationNotes: new FormControl(null),
      civilizedSpaceNotes: new FormControl(null),
      lowestKnownPhantomSystem: new FormControl(null),
      wikiLink: new FormControl(null),
      legacyWikiLink: new FormControl(null),
      externalLink: new FormControl(null),
      videoLink: new FormControl(null),
      interRegionDistances: this.formBuilder.array([])
    });
  }

  setRegion(region: IRegion): void {
    this.currentRegion = region;

    this.regionForm.patchValue(region);
    this.interRegionDistanceComponent?.setRegion(region);

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

    if (this.activeFormField === RegionInputFormFieldTypes.InterRegionDistance) {
      this.interRegionDistanceComponent?.initializeDistances();
    }

    this.activeFormFields.push(this.activeFormField);
  }

  onSelectedFiles(event: any) {
    this.totalSize = 0;
    this.files = event.currentFiles;
    this.files.forEach((file) => {
      this.totalSize += parseInt(file.size);
    });
    this.totalSizePercent = (this.totalSize / this.maxFileSize) * 100;
  }

  onRemoveTemplatingFile(event: any, file: any, removeFileCallback: any, index: number) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(file.size);
    this.totalSizePercent = (this.totalSize / this.maxFileSize) * 100;
  }

  chooseImage(callback: any) {
    callback();
  }

  get isNextDisabled(): boolean {
    if (!this.activeFormField) return false;

    const requiredFieldMapping: Record<string, string[]> = {
      [RegionInputFormFieldTypes.Galaxy]: ['galaxy'],
      [RegionInputFormFieldTypes.RegionName]: ['regionName'],
      [RegionInputFormFieldTypes.SurveyInfo]: ['surveyedBy', 'surveyDate'],
      [RegionInputFormFieldTypes.GalacticCoordinates]: ['galacticCoordinates'],
      [RegionInputFormFieldTypes.GameInfo]: ['gameRelease'],
      [RegionInputFormFieldTypes.InterRegionDistance]: ['interRegionDistances'],
    };

    const controlsToCheck = requiredFieldMapping[this.activeFormField] || [];
    return controlsToCheck.some(controlName => {
      const control = this.regionForm.get(controlName);
      return control ? control.invalid : false;
    });
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
      gameReleaseVersionNumber: this.gameReleaseVersionNumber,
      gameReleaseDate: this.gameReleaseDate,
      summaryNotes: this.summaryNotes,
      locationNotes: this.locationNotes,
      civilizedSpaceNotes: this.civilizedSpaceNotes,
      lowestKnownPhantomSystem: this.lowestKnownPhantomSystem,
      wikiLink: this.wikiLink,
      legacyWikiLink: this.legacyWikiLink,
      externalLink: this.externalLink,
      videoLink: this.videoLink,
      interRegionDistances: this.interRegionDistances,
    };
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  startNewRegion() {
    this.router.navigate(['/regions/region'], {
      queryParams: {},
      replaceUrl: true
    });
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
    return this.galacticCoordinatesControl.value;
  }

  get galacticCoordinatesControl(): FormControl {
    return this.regionForm.get('galacticCoordinates') as FormControl;
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

  get gameReleaseVersionNumber(): number {
    return this.regionForm.controls.gameReleaseVersionNumber.value;
  }

  get gameReleaseDate(): Moment {
    return moment(this.regionForm.controls.gameReleaseDate.value);
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

  get interRegionDistancesFormArray(): FormArray {
    return this.regionForm.get('interRegionDistances') as FormArray;
  }

  get interRegionDistances(): IInterRegionDistance[] {
    return this.interRegionDistancesFormArray.value.length > 0 ? this.interRegionDistancesFormArray.value : [];
  }
}
