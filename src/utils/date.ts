import { Aarti } from '../types';

export const toDevanagariNumerals = (num: number | string): string => {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (w) => devanagariDigits[+w]);
};

/**
 * Returns current time in IST (UTC + 5:30)
 */
export const getNowInIST = (): Date => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * 5.5);
};

export interface NextAartiResult {
  aarti: Aarti | null;
  formattedTime: string;
  hoursLeft: number;
  minutesLeft: number;
  displayTextHi: string;
  displayTextEn: string;
}

/**
 * Calculates next upcoming aarti from the list, respecting days of week and time in IST.
 */
export const getNextAarti = (aartis: Aarti[]): NextAartiResult => {
  if (!aartis || aartis.length === 0) {
    return {
      aarti: null,
      formattedTime: '',
      hoursLeft: 0,
      minutesLeft: 0,
      displayTextHi: 'कोई आगामी आरती नहीं',
      displayTextEn: 'No upcoming aarti',
    };
  }

  const nowIST = getNowInIST();
  const currentDay = nowIST.getDay(); // 0 = Sunday
  const currentHours = nowIST.getHours();
  const currentMinutes = nowIST.getMinutes();
  const currentTotalMins = currentHours * 60 + currentMinutes;

  // Active aartis for today that are in the future
  const candidatesToday: { aarti: Aarti; diffMins: number }[] = [];
  const candidatesLater: { aarti: Aarti; diffMins: number }[] = [];

  for (const item of aartis) {
    if (!item.active) continue;
    const [hh, mm] = item.time.split(':').map(Number);
    const itemTotalMins = hh * 60 + mm;

    if (item.days.includes(currentDay)) {
      if (itemTotalMins > currentTotalMins) {
        candidatesToday.push({ aarti: item, diffMins: itemTotalMins - currentTotalMins });
      } else {
        // Today has passed, next would be next scheduled day
        const diff = (24 * 60 - currentTotalMins) + itemTotalMins;
        candidatesLater.push({ aarti: item, diffMins: diff });
      }
    } else {
      // Find days ahead
      let daysAhead = 1;
      while (daysAhead <= 7) {
        const nextDay = (currentDay + daysAhead) % 7;
        if (item.days.includes(nextDay)) {
          const diff = daysAhead * 24 * 60 + (itemTotalMins - currentTotalMins);
          candidatesLater.push({ aarti: item, diffMins: diff });
          break;
        }
        daysAhead++;
      }
    }
  }

  candidatesToday.sort((a, b) => a.diffMins - b.diffMins);
  candidatesLater.sort((a, b) => a.diffMins - b.diffMins);

  const selected = candidatesToday.length > 0 ? candidatesToday[0] : candidatesLater[0];

  if (!selected) {
    return {
      aarti: null,
      formattedTime: '',
      hoursLeft: 0,
      minutesLeft: 0,
      displayTextHi: 'कोई आरती उपलब्ध नहीं',
      displayTextEn: 'No aarti scheduled',
    };
  }

  const hoursLeft = Math.floor(selected.diffMins / 60);
  const minutesLeft = selected.diffMins % 60;

  // Format time (12-hour AM/PM)
  const [h24, m] = selected.aarti.time.split(':').map(Number);
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 || 12;
  const timeStr = `${h12}:${m < 10 ? '0' : ''}${m} ${ampm}`;

  let timeCountdownEn = '';
  if (hoursLeft > 0) {
    timeCountdownEn = `${hoursLeft}h ${minutesLeft}m`;
  } else {
    timeCountdownEn = `${minutesLeft}m`;
  }

  let timeCountdownHi = '';
  if (hoursLeft > 0) {
    timeCountdownHi = `${toDevanagariNumerals(hoursLeft)} घंटे ${toDevanagariNumerals(minutesLeft)} मिनट`;
  } else {
    timeCountdownHi = `${toDevanagariNumerals(minutesLeft)} मिनट`;
  }

  const displayTextHi = `अगली आरती: ${selected.aarti.title.hi} (${timeStr}) - ${timeCountdownHi} में`;
  const displayTextEn = `Next aarti: ${selected.aarti.title.en} (${timeStr}) in ${timeCountdownEn}`;

  return {
    aarti: selected.aarti,
    formattedTime: timeStr,
    hoursLeft,
    minutesLeft,
    displayTextHi,
    displayTextEn,
  };
};

export const formatISODate = (isoString: string, lang: 'hi' | 'en' = 'hi'): string => {
  try {
    const d = new Date(isoString);
    const monthsHi = [
      'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
      'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर',
    ];
    const monthsEn = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    if (lang === 'hi') {
      return `${toDevanagariNumerals(day)} ${monthsHi[month]} ${toDevanagariNumerals(year)}`;
    }
    return `${day} ${monthsEn[month]} ${year}`;
  } catch {
    return isoString;
  }
};
