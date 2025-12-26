import { ISearchRequest } from '@shared/models/application/search-request';
import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';
import { GamePlatformTypes } from '@shared/models/in-game/game-platform-types';

export interface IGameEntitySearchRequest extends ISearchRequest {
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
