import { LRUCache } from './lru-cache';

test('lru cache', () => {
    const lruCache = new LRUCache<number>(2);
    lruCache.put(1, 1);
    expect(lruCache.get(1)).toBe(1);
    lruCache.put(2, 2);
    expect(lruCache.get(1)).toBe(1);
    lruCache.put(3, 3);
    expect(lruCache.get(3)).toBe(3);
    expect(lruCache.get(2)).toBe(-1);
    lruCache.put(4, 4);
    expect(lruCache.get(1)).toBe(-1);
    expect(lruCache.get(3)).toBe(3);
    expect(lruCache.get(4)).toBe(4);
});

test('lru cache 1', () => {
    const lruCache = new LRUCache<number>(2);
    lruCache.put(2, 1);
    lruCache.put(2, 2);
    expect(lruCache.get(2)).toBe(2);
    lruCache.put(1, 1);
    lruCache.put(4, 1);
    expect(lruCache.get(2)).toBe(-1);
});

test('lru cache string', () => {
    const lruCache = new LRUCache<string>(2);
    lruCache.put('2', '2');
    lruCache.put('2', '2');
    expect(lruCache.get('2')).toBe('2');
    lruCache.put('1', '1');
    lruCache.put('4', '1');
    expect(lruCache.get('2')).toBe(-1);
});