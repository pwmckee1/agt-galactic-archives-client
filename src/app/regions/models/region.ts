import { IInterRegionDistance } from '@regions/models/inter-region-distance';

import { IGameEntity } from '@shared/models/in-game/game-entity';

import { GalacticQuadrantTypes } from './galactic-quadrant-types';

export interface IRegion extends IGameEntity {
  regionId?: string;
  regionName?: string;
  regionAge?: number;
  galacticQuadrant?: GalacticQuadrantTypes;
  earliestKnownSurveyor?: string;
  latestKnownSurveyor?: string;
  summaryNotes?: string;
  locationNotes?: string;
  civilizedSpaceNotes?: string;
  lowestKnownPhantomSystem?: string;
  externalLink1?: string;
  videoLink1?: string;
  lightYearsFromCenter?: number;
  earliestSystemDiscovery?: string;
  baseCoordinates?: string;
  earliestSurveyorWikiUser?: string;
  latestSurveyorWikiUser?: string;
  adminNotes?: string;
  legacyGame?: string;
  legacyWikiLink?: string;
  version?: string;
  imageLink?: string;
  interRegionDistances?: IInterRegionDistance[];
}
