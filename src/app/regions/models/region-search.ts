import { KeyValuePair } from '@shared/models/application/key-value-pair';
import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';
import { GamePlatformTypes } from '@shared/models/in-game/game-platform-types';
import { ISearchRequest } from '@shared/models/in-game/search-request';

export interface IRegionSearch extends ISearchRequest {
  regionId?: string;
  regionName?: string;
  getQueryParams(): KeyValuePair[];
}

export class RegionSearch implements IRegionSearch, ISearchRequest {
  regionId?: string;
  regionName?: string;
  galaxy?: GalaxyTypes;
  surveyedBy?: string;
  surveyDate?: string;
  discoveredBy?: string;
  discoveryDate?: string;
  gameModeType?: string;
  gamePlatformType?: GamePlatformTypes;
  civilization?: string;
  gameRelease?: string;
  gameReleaseVersionNumber?: string;
  gameReleaseDate?: string;

  getQueryParams(): KeyValuePair[] {
    const params: KeyValuePair[] = [];

    Object.keys(this).forEach(key => {
      const value = (this as any)[key];
      if (value !== undefined && value !== null && value !== '') {
        params.push({ key, value });
      }
    });

    return params;
  }
}
