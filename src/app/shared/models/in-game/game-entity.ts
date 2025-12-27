import * as moment from 'moment';

import { GameModeTypes } from '@shared/models/in-game/game-mode-types';

import { GalaxyTypes } from './galaxy-types';

export interface IGameEntity {
  galaxy?: GalaxyTypes;
  galaxySequence?: number;
  regionId?: string;
  region?: string;
  starSystemId?: string;
  starSystem?: string;
  planetId?: string;
  planet?: string;
  galacticCoordinates?: string;
  glyphHexCode?: string;
  regionName?: string;
  starSystemName?: string;
  planetName?: string;
  yAxisPlanetCoordinate?: number;
  xAxisPlanetCoordinate?: number;
  xxHex?: string;
  yyHex?: string;
  zzHex?: string;
  ssHex?: string;
  xxDec?: number;
  yyDec?: number;
  zzDec?: number;
  sSDec?: number;
  surveyedBy?: string;
  surveyDate?: moment.Moment;
  discoveredBy?: string;
  discoveryDate?: moment.Moment;
  gameModeType?: GameModeTypes;
  gamePlatformType?: string;
  civilization?: string;
  gameRelease?: string;
  gameReleaseVersionNumber?: string;
  gameReleaseDate?: moment.Moment;
  description?: string;
  additionalNotes?: string;
  wikiLink?: string;
  discoveredLinkOnWiki?: string;
  imageLink?: string;
}
