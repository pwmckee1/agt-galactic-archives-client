import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JWT_OPTIONS, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { environment } from '@environments/environment';
import { TranslateLoader } from '@ngx-translate/core';
import { AppConfigService } from '@shared/services/application/app-config.service';
import { RoleTypes } from '@users/models/role-types';
import { CacheService } from './services/cache.service';
import { TranslateApiLoader } from './services/translate-api.loader';

/** Provides a factory for JWT interceptor configuration so that whitelist domains can be configured dynamically. */
export function jwtOptionsFactory(cache: CacheService) {
  return {
    tokenGetter: () => {
      const cached = cache.coreApiToken;
      if (cached) {
        return cached;
      }
      return null;
    },
    disallowedRoutes: [
      /^sites/,
    ],
    allowedDomains: [environment.apiUrl.replace('https://', '')],
  };
}

export function translateHttpLoaderFactory(
  http: HttpClient,
  appConfig: AppConfigService,
  role: RoleTypes = null): TranslateLoader {
  return new TranslateApiLoader(http, appConfig, role);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'CSRF-Token',
      headerName: 'X-CSRF-Token',
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [CacheService],
      },
    } as JwtModuleOptions),
  ]
})
export class CoreModule { }
