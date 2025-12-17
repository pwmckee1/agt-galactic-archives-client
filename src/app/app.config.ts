import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
  provideAnimations(),
  provideToastr({
    maxOpened: 3,
    preventDuplicates: true,
    autoDismiss: true,
  })]
};
