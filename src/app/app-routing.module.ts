import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionComponent } from '@regions/components/region/region.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: RegionComponent
  },
  // {
  //   path: 'regions',
  //   loadComponent: () => import('./features/regions/components/region-list/region-list.component').then(m => m.RegionListComponent)
  // },
  // {
  //   path: 'regions/new',
  //   loadComponent: () => import('./features/regions/components/region-form/region-form.component').then(m => m.RegionFormComponent)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
