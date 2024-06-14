import { SetOptionsProps } from '@/types/calendarType';
import { useEffect } from 'react';

export default function useSetOptions({
  startDate,
  lastDate,
  currentYear,
  currentMonth,
  setCurrentMonth,
}: SetOptionsProps) {
  const startYear = Number(startDate.slice(0, 4));
  const lastYear = Number(lastDate.slice(0, 4));
  const startMonth = Number(startDate.slice(4, 6));
  const lastMonth = Number(lastDate.slice(4, 6));

  const getMonthOptions = (year: number) => {
    if (year === startYear && year === lastYear) {
      return Array.from({ length: lastMonth - startMonth + 1 }, (_, i) => startMonth + i);
    } else if (year === startYear) {
      return Array.from({ length: 12 - startMonth + 1 }, (_, i) => startMonth + i);
    } else if (year === lastYear) {
      return Array.from({ length: lastMonth }, (_, i) => i + 1);
    } else {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    }
  };

  const yearOptions = Array.from({ length: lastYear - startYear + 1 }, (_, i) => startYear + i);
  const monthOptions = getMonthOptions(currentYear);

  useEffect(() => {
    if (currentMonth < monthOptions[0]) {
      setCurrentMonth(monthOptions[0]);
    } else if (currentMonth >= monthOptions[monthOptions.length - 1]) {
      setCurrentMonth(monthOptions[monthOptions.length - 1]);
    }
  }, [monthOptions, currentMonth, setCurrentMonth]);

  return { yearOptions, monthOptions };
}
