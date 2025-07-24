import {cn} from '@/lib/utils';
import React, {useState} from 'react';
const options = ['check-in', 'check-out'] as const;

type OptionType = (typeof options)[number];

export default function CalendarBar() {
  const [selectedOpt, setSelectedOpt] = useState<OptionType | null>(null);
  const [hovered, setHovered] = useState<OptionType | null>(null);

  return (
    <div className='mx-auto w-fit mt-10'>
      <div
        className={cn(
          'border border-slate-100  overflow-hidden rounded-4xl flex bg-white',
          {
            'bg-slate-100': selectedOpt !== null,
          }
        )}
      >
        {options.map((opt, index) => (
          <div
            key={index}
            onMouseEnter={() => setHovered(opt)}
            onMouseLeave={() => setHovered(null)}
            className={cn('', {
              'bg-slate-200 ':
                selectedOpt !== null && hovered !== null && hovered !== opt,
            })}
          >
            <div
              onClick={() =>
                setSelectedOpt((prev) => (prev === opt ? null : opt))
              }
              className={cn(
                'hover:bg-slate-100 bg-white rounded-4xl px-8 py-5 cursor-pointer',
                {
                  'bg-white hover:bg-white  ': selectedOpt === opt,
                  'hover:bg-slate-200 rounded-none bg-slate-100':
                    selectedOpt !== opt && selectedOpt !== null,
                }
              )}
            >
              {opt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
