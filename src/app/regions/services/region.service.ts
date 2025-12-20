import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegionSearch } from '@regions/models/region-search';
import { IUpsertRegion } from '@regions/models/upsert-region';
import { ApiResponse } from '@shared/models/application/api-response';
import { KeyValuePair } from '@shared/models/application/key-value-pair';
import { AppConfigService } from '@shared/services/application/app-config.service';
import { map, Observable } from 'rxjs';
import { IRegion } from '@regions/models/region'

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
  ) {
  }

  private getRegionUrl(regionId: string = null, params: KeyValuePair[] = []): string {
    const query = params
      .map((pair: KeyValuePair, index: number) => (`${ index === 0 ? '?' : '&' }${ pair.key }=${ pair.value }`))
      .join('');
    return regionId ? `${ this.appConfig.apiUrl }/region/${ regionId }` : `${ this.appConfig.apiUrl }/region${ query }`;
  }

  getRegionById(regionId: string): Observable<ApiResponse<IRegion>> {
    return this.http.get(this.getRegionUrl(regionId))
      .pipe(
        map((res: ApiResponse<IRegion>) => new ApiResponse<IRegion>(
          true,
          {
            response: res.response,
            messages: res.messages,
          },
        ))
      );
  }

  getRegions(searchRequest: IRegionSearch): Observable<ApiResponse<IRegion[]>> {
    const params = searchRequest.getQueryParams();
    return this.http.get(this.getRegionUrl(null, params))
      .pipe(
        map((res: ApiResponse<IRegion>) => new ApiResponse<IRegion[]>(
          true,
          {
            response: res.response,
            messages: res.messages,
          },
        ))
      );
  }

  upsertRegion(region: IUpsertRegion): Observable<ApiResponse<IRegion>> {
    return this.http.post(this.getRegionUrl(), region)
      .pipe(
        map((res: ApiResponse<IRegion>) => new ApiResponse<IRegion>(
          true,
          {
            response: res.response,
            messages: res.messages,
          },
        ))
      )
  }
}
