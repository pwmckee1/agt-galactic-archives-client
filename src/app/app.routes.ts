import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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
