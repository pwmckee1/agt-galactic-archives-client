import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TTLCache } from '@shared/models/application/ttl-cache';
import store, { StoreAPI } from 'store2';

/**
 * Service holds certain values to persist in local storage to be restored at a later time
 */
@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private store: StoreAPI;

  private apiCache: TTLCache<HttpResponse<any>> = new TTLCache();
  static readonly API_CACHE_STORAGE_KEY = 'api-ttl-cache';

  constructor() {
    this.store = store;
    this.apiCache = this.loadAPICacheFromLocalStorage();
    if (!this.apiCache) this.apiCache = new TTLCache();
  }

  clearAll(clearFeatureFlags: boolean = false, clearMasquerade: boolean = true): void {
    this.clearCoreApiCache();
    this.clearApiCache();
  }

  /**
   * Last email used by a user via the teacher login
   * NOTE: This is purposely email, as student logins will not be 'remembered'
   */
  get lastEmailUsed(): string {
    return this.store.get('lastEmailUsed');
  }

  set lastEmailUsed(val: string) {
    this.store.set('lastEmailUsed', val);
  }

  /**
   * Last login path used by the actively logged in user to facilitate the proper redirection upon logout
   */
  get lastLoginPathUsed(): string {
    return this.store.get('lastLoginPathUsed');
  }

  get coreApiToken(): string {
    return this.store.get('coreApiToken');
  }

  set coreApiToken(value: string) {
    this.store.set('coreApiToken', value);
  }

  clearCoreApiCache() {
    this.store.remove('coreApiToken');
  }

  get usersLastRole() {
    return this.store.get('usersLastRole');
  }

  /**
   * Needs set before masquerading at any level.
   * Tracks the previous role before user masquerades as another user.
   * Can be used to determind which role the masquerade session started from while masquerading.
   */
  set usersLastRole(value: string) {
    this.store.set('usersLastRole', value);
  }

  getCachedApiCall(key: string): any | null {
    return this.apiCache.getValue(key);
  }

  cacheApiCall(key: string, value: HttpResponse<any>, ttl: number) {
    this.apiCache.setValue(key, value, ttl);
    this.saveAPICacheToLocalStorage();
  }

  clearApiCache(): void {
    this.apiCache.clear();
    this.store.remove(CacheService.API_CACHE_STORAGE_KEY);
  }

  clearCachedKey(key: string) {
    this.apiCache.clearCachedKey(key);
    this.saveAPICacheToLocalStorage();
  }

  clearCachedPattern(pattern: string) {
    this.apiCache.clearCachedPattern(pattern);
    this.saveAPICacheToLocalStorage();
  }

  saveAPICacheToLocalStorage() {
    try {
      this.store.set(CacheService.API_CACHE_STORAGE_KEY, this.apiCache.serializeCache());
    } catch (err) {
      console.error('Failed to save cache to local storage', err);
    }
  }

  loadAPICacheFromLocalStorage(): TTLCache<any> {
    try {
      const serializedCache = this.store.get(CacheService.API_CACHE_STORAGE_KEY);
      if (serializedCache) {
        return new TTLCache(serializedCache);
      }
    } catch (err) {
      console.error('Failed to load cache from local storage', err);
    }
    return null;
  }
}
