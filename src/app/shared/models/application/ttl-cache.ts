type CacheItem<T> = {
  hitCount: number;
  expiresAt: string; // Store date as string for serialization
  value: T;
};

export class TTLCache<T> {
  private cache: Map<string, CacheItem<T>> = new Map();

  constructor(serializedCache?: string) {
    this.loadCache(serializedCache);
  }

  getValue(key: string): any | null {
    const now = new Date();
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    if (now.getTime() > new Date(item.expiresAt).getTime()) {
      this.cache.delete(key);
      return null;
    }

    item.hitCount++;
    this.cache.set(key, item);
    return item.value;
  }

  setValue(key: string, value: T, ttl: number) {
    const date = new Date();
    const expiresAt = new Date(date.getTime() + ttl);
    this.cache.set(key, { hitCount: 1, expiresAt: expiresAt.toISOString(), value });
  }

  clear() {
    this.cache = new Map();
  }

  clearCachedKey(key: string) {
    this.cache.delete(key);
  }

  clearCachedPattern(pattern: string) {
    const keys = Array.from(this.cache.keys());
    keys.forEach((key) => {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    });
  }

  serializeCache(): string {
    return JSON.stringify(Array.from(this.cache.entries()));
  }

  loadCache(serializedCache: string) {
    if (serializedCache) {
      try {
        const entries = JSON.parse(serializedCache) as [string, CacheItem<T>][];
        this.cache = new Map(entries);
      } catch (err) {
        console.error('Failed to parse cached entries', err);
      }
    }
  }
}
