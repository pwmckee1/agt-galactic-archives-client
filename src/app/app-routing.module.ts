import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'regions',
    loadChildren: () => import('@regions/regions-routing.module').then(m => m.RegionsRoutingModule)
  }
];
