import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlanetComponent } from '@planets/components/planet/planet.component';
import { PlanetsComponent } from '@planets/components/planets/planets.component';

const routes: Routes = [
  {
    path: '',
    component: PlanetsComponent,
  },
  {
    path: ':planetId',
    component: PlanetComponent
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
export class PlanetsRoutingModule { }
