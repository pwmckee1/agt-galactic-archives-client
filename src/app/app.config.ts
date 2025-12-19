import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Ensure this exact path
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app-routing.module';
import { AgtPreset } from './themes/agt-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: AgtPreset
      }
    }),
    provideAnimationsAsync(),
    provideToastr({
      maxOpened: 3,
      preventDuplicates: true,
      autoDismiss: true,
    })]
};
