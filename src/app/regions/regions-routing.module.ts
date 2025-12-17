import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegionComponent } from '@regions/components/region/region.component';
import { RegionsComponent } from '@regions/components/regions/regions.component';


const routes: Routes = [
  {
    path: '',
    component: RegionsComponent,
  },
  {
    path: ':regionId',
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
