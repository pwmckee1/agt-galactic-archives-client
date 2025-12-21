import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private readonly _apiUrl: string = null;
  private readonly _assetUrl: string = null;

  constructor() {
    this._apiUrl = environment.apiUrl;
    this._assetUrl = environment.assetUrl;
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  get assetUrl(): string {
    return this._assetUrl;
  }
}
