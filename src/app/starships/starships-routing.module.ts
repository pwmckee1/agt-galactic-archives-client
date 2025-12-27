import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarshipComponent } from '@starships/components/starship/starship.component';
import { StarshipsComponent } from '@starships/components/starships/starships.component';

const routes: Routes = [
  {
    path: '',
    component: StarshipsComponent,
  },
  {
    path: ':starshipId',
    component: StarshipComponent
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
export class StarshipsRoutingModule { }
