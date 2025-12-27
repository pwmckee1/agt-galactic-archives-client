import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettlementComponent } from '@settlements/components/settlement/settlement.component';
import { SettlementsComponent } from '@settlements/components/settlements/settlements.component';

const routes: Routes = [
  {
    path: '',
    component: SettlementsComponent,
  },
  {
    path: ':settlementId',
    component: SettlementComponent
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
export class SettlementsRoutingModule { }
