import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { POIComponent } from '@pois/components/poi/poi.component';
import { POIsComponent } from '@pois/components/pois/pois.component';

const routes: Routes = [
  {
    path: '',
    component: POIsComponent,
  },
  {
    path: ':poiId',
    component: POIComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class POIRoutingModule { }
