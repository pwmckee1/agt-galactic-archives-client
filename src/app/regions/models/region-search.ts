import { SearchRequest } from '@shared/models/application/search-request';
import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';
import { IGameEntitySearchRequest } from '@shared/models/in-game/game-entity-search-request';
import { GamePlatformTypes } from '@shared/models/in-game/game-platform-types';

export interface IRegionSearch extends IGameEntitySearchRequest {
  regionId?: string;
  regionName?: string;
}

export class RegionSearch extends SearchRequest implements IRegionSearch, IGameEntitySearchRequest {
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
}
