import React, {useState} from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  getDay,
  setDay,
  isSameDay,
  isBefore,
  isWithinInterval,
} from 'date-fns';
import {tr} from 'date-fns/locale';
import {cn} from '@/lib/utils';
import {useCalendarContext} from './calendar-context';

export default function MonthlyCalendar() {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);

  const monthDays = eachDayOfInterval({start, end});
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    selectedOpt,
    setSelectedOpt,
  } = useCalendarContext();

  const firstDayIndex = getDay(start) === 0 ? 6 : getDay(start) - 1;
  const weekDays = Array.from({length: 7}, (_, i) =>
    format(setDay(new Date(), (i + 1) % 7), 'EEEE')
  );

  const handleSelectDate = (day: Date) => {
    if (checkIn && isBefore(day, checkIn)) {
      setCheckIn(day);
      setCheckOut(null);
      return;
    }

    if (!checkIn || selectedOpt === 'check-in') {
      setCheckIn(day);
      setSelectedOpt('check-out');
    } else {
      setCheckOut(day);
    }
  };
  const isInRange = (day: Date) => {
    if (!checkIn) return;
    return isWithinInterval(day, {
      start: checkIn,
      end: checkOut || hoveredDate || checkIn,
    });
  };
  return (
    <div className=' p-4'>
      <h2 className='text-center text-xl font-semibold mb-4'>
        {format(today, 'MMMM yyyy')}
      </h2>

      <div className='grid grid-cols-7 text-sm text-center font-medium mb-2'>
        {weekDays.map((day) => (
          <div key={day}>{day[0]}</div>
        ))}
      </div>

      <div className='grid grid-cols-7  text-center'>
        {Array.from({length: firstDayIndex}).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {monthDays.map((day) => {
          const isSelected =
            (checkIn && isSameDay(checkIn, day)) ||
            (checkOut && isSameDay(checkOut, day));

          return (
            <div
              onMouseEnter={() => setHoveredDate(day)}
              onMouseLeave={() => setHoveredDate(null)}
              onClick={() => handleSelectDate(day)}
              key={day.toString()}
              className={cn(
                ' border border-transparent aspect-square h-auto w-full flex justify-center items-center',
                {
                  'bg-red-300 rounded-full': isSelected,
                  'bg-gray-100': isInRange(day) && !isSelected,
                  'hover:border-black hover:rounded-full': !isSelected,
                }
              )}
            >
              <div>{format(day, 'd')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
