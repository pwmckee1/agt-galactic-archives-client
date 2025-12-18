import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUpsertRegion } from '@regions/models/upsert-region';
import { ApiResponse } from '@shared/models/application/api-response';
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
  ) { }

  private getRegionUrl(regionId: string = null): string {
    return regionId ? `${this.appConfig.apiUrl}/region/${regionId}` : `${this.appConfig.apiUrl}/region`;
  }

  getRegions(regionId: string = null): Observable<ApiResponse<IRegion[]>> {
    return this.http.get(this.getRegionUrl(regionId))
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
