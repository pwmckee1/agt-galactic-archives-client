import { ISearchRequest, SearchRequest } from '@shared/models/application/search-request';

export interface IGameReleaseSearchRequest extends ISearchRequest {
  gameReleaseId?: string;
  name?: string;
  releaseNumber?: string;
}

export class GameReleaseSearchRequest extends SearchRequest implements IGameReleaseSearchRequest, ISearchRequest {
  gameReleaseId?: string;
  name?: string;
  releaseNumber?: string;
}
