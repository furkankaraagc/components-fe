import {useRef, useState} from 'react';
import {CalendarContext} from './calendar-context';
import {OptionType} from './calendar-bar';

interface CalendarContextProviderProps {
  children: React.ReactNode;
}
export function CalendarContextProvider({
  children,
}: CalendarContextProviderProps) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<OptionType | null>(null);

  return (
    <CalendarContext.Provider
      value={{
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        selectedOpt,
        setSelectedOpt,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
