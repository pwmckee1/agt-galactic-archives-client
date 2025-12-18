import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';
import { GamePlatformTypes } from '@shared/models/in-game/game-platform-types';

export interface ISearchRequest {
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;
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
