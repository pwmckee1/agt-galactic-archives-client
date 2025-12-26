import { KeyValuePair } from '@shared/models/application/key-value-pair';

export interface ISearchRequest {
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;

  getQueryParams(): KeyValuePair[];
}

export class SearchRequest implements ISearchRequest {

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
