import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MultiToolComponent } from '@multi-tools/components/multi-tool/multi-tool.component';
import { MultiToolsComponent } from '@multi-tools/components/multi-tools/multi-tools.component';

const routes: Routes = [
  {
    path: '',
    component: MultiToolsComponent,
  },
  {
    path: ':multi-toolId',
    component: MultiToolComponent
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
export class MultiToolsRoutingModule { }
