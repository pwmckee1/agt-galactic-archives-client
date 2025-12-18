import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
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
    CommonModule
  ]
})
export class POIRoutingModule { }
