import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerBaseComponent } from '@player-bases/components/player-base/player-base.component';
import { PlayerBasesComponent } from '@player-bases/components/player-bases/player-bases.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerBasesComponent,
  },
  {
    path: ':playerBaseId',
    component: PlayerBaseComponent
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
export class PlayerBasesRoutingModule { }
