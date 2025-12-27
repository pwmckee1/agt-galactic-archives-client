import { IInterRegionDistance } from '@regions/models/inter-region-distance';
import * as moment from 'moment/moment';

import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';
import { GameModeTypes } from '@shared/models/in-game/game-mode-types';
import { GamePlatformTypes } from '@shared/models/in-game/game-platform-types';

export interface IUpsertRegion {
  surveyedBy: string,
  surveyDate?: moment.Moment;
  galaxy: GalaxyTypes,
  regionName: string,
  legacyName?: string
  regionAge?: number
  galacticCoordinates: string;
  gameRelease: string;
  gamePlatform?: GamePlatformTypes;
  gameMode?: GameModeTypes;
  gameReleaseVersionNumber?: number;
  gameReleaseDate?: moment.Moment;
  earliestKnownSurveyor?: string;
  latestKnownSurveyor?: string;
  summaryNotes?: string;
  locationNotes?: string;
  civilizedSpaceNotes?: string;
  lowestKnownPhantomSystem?: string;
  wikiLink?: string;
  legacyWikiLink?: string;
  externalLink?: string;
  videoLink?: string;
  interRegionDistances?: IInterRegionDistance[];
}
