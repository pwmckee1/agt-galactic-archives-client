import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ApiResponse } from '@shared/models/application/api-response';
import { TranslateLoader } from '@ngx-translate/core';
import { RoleTypes } from '@users/models/role-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConfigService } from '@shared/services/application/app-config.service';

export const LOCALE_ROLE = new InjectionToken<RoleTypes>(null);

@Injectable()
export class TranslateApiLoader implements TranslateLoader {
  role: RoleTypes = null;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    @Inject(LOCALE_ROLE) role: RoleTypes = null,
  ) {
    this.role = role;
  }

  getTranslationUrl(lang: String): string {
    const baseUrl = `${this.appConfig.apiUrl}/translate/static-text/locale/${lang}`;
    return this.role && this.role.length > 0 ? `${baseUrl}?role=${this.role}` : baseUrl;
  }

  getTranslation(lang: string): Observable<any> {
    return this.http.get<ApiResponse<any>>(this.getTranslationUrl(lang))
      .pipe(
        map(res => res.response),
      );
  }
}
