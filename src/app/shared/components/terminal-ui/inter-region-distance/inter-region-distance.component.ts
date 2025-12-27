import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IInterRegionDistance } from '@regions/models/inter-region-distance';
import { IRegion } from '@regions/models/region';
import { RegionInputFormFieldTypes } from '@regions/models/region-input-form-field-types';
import {
  TerminalCommunicationComponent
} from '@shared/components/terminal-ui/terminal-communication/terminal-communication.component';
import { FormHelpers } from '@shared/helpers/form-helpers';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'agt-inter-region-distance',
  imports: [
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    ReactiveFormsModule,
    NgClass,
    TerminalCommunicationComponent
  ],
  templateUrl: './inter-region-distance.component.html',
  styleUrl: './inter-region-distance.component.scss',
})
export class InterRegionDistanceComponent {
  @Input() regionForm: FormGroup;
  @Input() interRegionFormArray: FormArray;
  @Input() activeFormField: RegionInputFormFieldTypes;
  @Input() interRegionDistances: IInterRegionDistance[];
  @Input() minimumFields: number = 4;
  @Input() completedTyping: Record<string, boolean> = {};
  @Input() isNewRegion: boolean = false;

  FormFields = RegionInputFormFieldTypes;

  interRegionText: string = 'Inter-Region_Distance (4 Minimum):';
  regionNamePlaceholder: string = 'Current Region';
  interRegionDistancePlaceholder: string = 'Distance (LY)';
  localSystemNamePlaceholder: string = 'Local System';
  adjacentRegionNamePlaceholder: string = 'Adjacent Region';
  adjacentRegionSystemNamePlaceholder: string = 'Adjacent Region System';
  localSystemGlyphsPlaceholder: string = 'Local System Glyphs';
  adjacentRegionSystemGlyphsPlaceholder: string = 'Adjacent System Glyphs';

  isReadOnly: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) { }

  setRegion(region: IRegion): void {
    if (region.interRegionDistances?.length) {
      this.interRegionFormArray.clear();
      region.interRegionDistances.forEach((distance) => this.addDistance(distance));
    }
  }

  initializeDistances(): void {
    if (this.interRegionFormArray && this.interRegionFormArray.length === 0) {
      for (let i = 0; i < this.minimumFields; i++) {
        this.addDistance();
      }
    }
  }

  addDistance(distance: IInterRegionDistance = null): void {
    const distanceGroup = this.formBuilder.group({
      distanceFormRegionName: [distance?.regionName],
      adjacentRegionName: [distance?.adjacentRegionName],
      localSystemName: [distance?.localSystemName],
      adjacentRegionSystemName: [distance?.adjacentRegionSystemName],
      localSystemGlyphs: [distance?.localSystemGlyphs],
      adjacentRegionSystemGlyphs: [distance?.adjacentRegionSystemGlyphs],
      distance: [distance?.distance, [Validators.min(0)]]
    }, { validators: [FormHelpers.interRegionGroupValidator()] });

    this.interRegionFormArray.push(distanceGroup);
    this.interRegionFormArray.updateValueAndValidity();
  }

  addDistanceAndRefresh(): void {
    this.addDistance();
    this.cdr.detectChanges();
  }

  removeDistance(index: number): void {
    if (index >= 4 && this.interRegionFormArray.length > 4) {
      this.interRegionFormArray.removeAt(index);
    }
  }

  onTypingComplete(field: RegionInputFormFieldTypes): void {
    this.completedTyping[field] = true;
  }
}
