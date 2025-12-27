import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FaunaComponent } from '@fauna/components/fauna/fauna.component';
import { FaunasComponent } from '@fauna/components/faunas/faunas.component';

const routes: Routes = [
  {
    path: '',
    component: FaunasComponent,
  },
  {
    path: ':faunaId',
    component: FaunaComponent
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
export class FaunaRoutingModule { }
