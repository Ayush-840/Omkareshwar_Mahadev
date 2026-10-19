import {
  toDevanagariNumerals,
  getNextAarti,
  formatISODate,
} from '../src/utils/date';
import { Aarti } from '../src/types';

describe('Date & Aarti Utilities', () => {
  test('toDevanagariNumerals converts latin digits to devanagari correctly', () => {
    expect(toDevanagariNumerals(108)).toBe('१०८');
    expect(toDevanagariNumerals('2027')).toBe('२०२७');
    expect(toDevanagariNumerals(0)).toBe('०');
  });

  test('formatISODate formats properly in Hindi and English', () => {
    const iso = '2027-03-08T00:00:00.000Z';
    const formattedHi = formatISODate(iso, 'hi');
    const formattedEn = formatISODate(iso, 'en');

    expect(formattedHi).toContain('मार्च');
    expect(formattedEn).toContain('Mar');
  });

  test('getNextAarti returns upcoming scheduled aarti', () => {
    const sampleAartis: Aarti[] = [
      {
        id: '1',
        title: { hi: 'मंगला आरती', en: 'Mangala Aarti' },
        time: '06:00',
        days: [0, 1, 2, 3, 4, 5, 6],
        lyrics: { hi: '', en: '' },
        order: 1,
        active: true,
      },
      {
        id: '2',
        title: { hi: 'संध्या महाआरती', en: 'Sandhya Maha Aarti' },
        time: '19:00',
        days: [0, 1, 2, 3, 4, 5, 6],
        lyrics: { hi: '', en: '' },
        order: 2,
        active: true,
      },
    ];

    const result = getNextAarti(sampleAartis);
    expect(result.aarti).not.toBeNull();
    expect(result.formattedTime).toBeTruthy();
    expect(result.displayTextHi).toContain('आरती');
    expect(result.displayTextEn).toContain('aarti');
  });
});
