import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegionComponent } from '@regions/components/region/region.component';
import { RegionsComponent } from '@regions/components/regions/regions.component';

const routes: Routes = [
  {
    path: '',
    component: RegionsComponent,
  },
  {
    path: 'region',
    component: RegionComponent
  },
  {
    path: 'region/:regionId',
    component: RegionComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RegionsRoutingModule { }
