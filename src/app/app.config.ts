import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { AgtPreset } from '@themes/agt-preset';
import { provideToastr } from 'ngx-toastr';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: AgtPreset,
        options: {
          darkModeSelector: 'none'
        }
      }
    }),
    provideAnimationsAsync(),
    provideToastr({
      maxOpened: 3,
      preventDuplicates: true,
      autoDismiss: true,
    })]
};
