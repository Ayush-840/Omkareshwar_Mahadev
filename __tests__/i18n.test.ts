import hi from '../src/i18n/locales/hi.json';
import en from '../src/i18n/locales/en.json';

function getKeys(obj: Record<string, any>, prefix = ''): string[] {
  return Object.keys(obj).reduce((res: string[], el: string) => {
    if (Array.isArray(obj[el])) {
      return res;
    } else if (typeof obj[el] === 'object' && obj[el] !== null) {
      return [...res, ...getKeys(obj[el], prefix + el + '.')];
    }
    return [...res, prefix + el];
  }, []);
}

describe('i18n Translation Key Parity', () => {
  test('all Hindi keys have corresponding English keys', () => {
    const hiKeys = getKeys(hi).sort();
    const enKeys = getKeys(en).sort();

    const missingInEn = hiKeys.filter((k) => !enKeys.includes(k));
    const missingInHi = enKeys.filter((k) => !hiKeys.includes(k));

    expect(missingInEn).toEqual([]);
    expect(missingInHi).toEqual([]);
  });

  test('all 9 home tiles exist in both translations', () => {
    const requiredTiles = [
      'info',
      'aarti',
      'events',
      'gallery',
      'community',
      'donate',
      'notices',
      'videos',
      'contact',
    ];

    for (const tile of requiredTiles) {
      expect((hi.tiles as any)[tile]).toBeDefined();
      expect((en.tiles as any)[tile]).toBeDefined();
    }
  });
});
