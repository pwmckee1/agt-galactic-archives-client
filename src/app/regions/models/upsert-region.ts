import { GalaxyTypes } from '@shared/models/in-game/galaxy-types';
import { GameModeTypes } from '@shared/models/in-game/game-mode-types';
import { GamePlatformTypes } from '@shared/models/in-game/game-platform-types';
import * as moment from 'moment/moment';

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
}
