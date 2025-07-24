import {cn} from '@/lib/utils';
import React, {useEffect, useRef, useState} from 'react';
import Calendar from './calendar';
import {useCalendarContext} from './calendar-context';
import {format} from 'date-fns';
const options = ['where', 'check-in', 'check-out'] as const;

export type OptionType = (typeof options)[number];

export default function CalendarBar() {
  const [hovered, setHovered] = useState<OptionType | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({width: 0, left: 0});
  const tabRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {checkIn, checkOut, selectedOpt, setSelectedOpt} = useCalendarContext();

  useEffect(() => {
    if (selectedOpt) {
      const activeTabElement = tabRefs.current[selectedOpt];
      if (activeTabElement) {
        setIndicatorStyle({
          width: activeTabElement.offsetWidth,
          left: activeTabElement.offsetLeft,
        });
      }
    } else {
      if (hovered) {
        const activeTabElement = tabRefs.current[hovered];
        if (activeTabElement) {
          setIndicatorStyle({
            width: activeTabElement.offsetWidth * 0.8,
            left: activeTabElement.offsetLeft
              ? activeTabElement.offsetLeft * 1.1
              : 15,
          });
        }
      }
      // else {
      //   setIndicatorStyle({width: 0, left: 0});
      // }
    }
  }, [selectedOpt, hovered]);
  const containerWidth =
    containerRef?.current && containerRef?.current?.offsetWidth;
  return (
    <div className='mx-auto w-fit mt-10'>
      <div
        className={cn(
          'border border-slate-100  rounded-4xl flex bg-white relative',
          {
            'bg-slate-100': selectedOpt !== null,
          }
        )}
      >
        {options.map((opt, index) => (
          <div
            ref={(el) => (tabRefs.current[opt] = el)}
            key={index}
            onMouseEnter={() => setHovered(opt)}
            onMouseLeave={() => setHovered(null)}
            className={cn('relative', {
              '': selectedOpt !== null && hovered !== null && hovered !== opt,
            })}
          >
            <div
              onClick={() =>
                setSelectedOpt((prev) => (prev === opt ? null : opt))
              }
              className={cn(
                'px-8 py-4 cursor-pointer rounded-4xl flex flex-col transition-all duration-200 text-black font-medium capitalize relative z-30',

                {
                  'text-black': selectedOpt === opt,
                  '': selectedOpt !== opt,
                  ' text-black': selectedOpt !== null && selectedOpt !== opt,
                }
              )}
            >
              <span>{opt}</span>
              <span>
                {opt === 'check-in' &&
                  (checkIn ? format(checkIn, 'MMM d') : 'Add dates')}
                {opt === 'check-out' &&
                  (checkOut ? format(checkOut, 'MMM d') : 'Add dates')}
              </span>
            </div>
          </div>
        ))}
        {selectedOpt && (
          <div
            style={{
              width: indicatorStyle.width,
              left: indicatorStyle.left,
            }}
            className='absolute top-0 bottom-0 rounded-4xl bg-white transition-all duration-300 z-10 pointer-events-none'
          />
        )}
        {/* content */}
        {selectedOpt && (
          <div
            className={cn(`absolute top-full w-full border z-50 rounded-4xl`)}
          >
            <Calendar />
          </div>
        )}
      </div>
    </div>
  );
}
