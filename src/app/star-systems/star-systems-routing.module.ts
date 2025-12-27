import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarSystemComponent } from '@star-systems/components/star-system/star-system.component';
import { StarSystemsComponent } from '@star-systems/components/star-systems/star-systems.component';

const routes: Routes = [
  {
    path: '',
    component: StarSystemsComponent,
  },
  {
    path: ':star-systemId',
    component: StarSystemComponent
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
export class StarSystemsRoutingModule { }
