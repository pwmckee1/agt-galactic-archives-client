import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/models/application/api-response';
import { KeyValuePair } from '@shared/models/application/key-value-pair';
import { IGameRelease } from '@shared/models/in-game/game-release';
import { GameReleaseSearchRequest } from '@shared/models/in-game/game-release-search-request';
import { AppConfigService } from '@shared/services/application/app-config.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameReleaseService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
  ) {
  }

  private getGameReleaseUrl(gameReleaseId: string = null, params: KeyValuePair[] = []): string {
    const query = params
      .map((pair: KeyValuePair, index: number) => (`${ index === 0 ? '?' : '&' }${ pair.key }=${ pair.value }`))
      .join('');
    return gameReleaseId ? `${ this.appConfig.apiUrl }/game-release/${ gameReleaseId }` : `${ this.appConfig.apiUrl }/game-release${ query }`;
  }

  getGameReleaseById(gameReleaseId: string): Observable<ApiResponse<IGameRelease>> {
    return this.http.get(this.getGameReleaseUrl(gameReleaseId))
      .pipe(
        map((res: ApiResponse<IGameRelease>) => new ApiResponse<IGameRelease>(
          true,
          {
            response: res.response,
            messages: res.messages,
          },
        ))
      );
  }

  getGameReleases(searchRequest: GameReleaseSearchRequest = null): Observable<ApiResponse<IGameRelease[]>> {
    const params = searchRequest?.getQueryParams();
    return this.http.get(this.getGameReleaseUrl(null, params))
      .pipe(
        map((res: ApiResponse<IGameRelease>) => new ApiResponse<IGameRelease[]>(
          true,
          {
            response: res.response,
            messages: res.messages,
          },
        ))
      );
  }

  upsertGameRelease(gameRelease: IGameRelease): Observable<ApiResponse<IGameRelease>> {
    return this.http.post(this.getGameReleaseUrl(), gameRelease)
      .pipe(
        map((res: ApiResponse<IGameRelease>) => new ApiResponse<IGameRelease>(
          true,
          {
            response: res.response,
            messages: res.messages,
          },
        ))
      )
  }
}
