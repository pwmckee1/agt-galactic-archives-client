import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegionService } from '@regions/services/region.service';
import { IRegion } from '@regions/models/region';
import { ApiResponse } from '@shared/models/application/api-response';

@Component({
  selector: 'agt-regions',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [RegionService],
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.css'
})
export class RegionsComponent implements OnInit {
  regions: IRegion[] = [];
  isLoading = true;

  constructor(private regionService: RegionService) {}

  ngOnInit(): void {
    this.regionService.getRegions().subscribe((res: ApiResponse<IRegion[]>) => {
      if (res.success) {
        this.regions = res.response;
      }
      this.isLoading = false;
    });
  }
}
