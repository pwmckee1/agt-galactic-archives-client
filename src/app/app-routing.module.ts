import { Routes } from '@angular/router';
import { AboutComponent } from '@home/components/about/about.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'regions',
    loadChildren: () => import('@regions/regions-routing.module').then(m => m.RegionsRoutingModule)
  }
];
