'use client';

import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import {OptionType} from './calendar-bar';

interface ICalendarContext {
  checkIn: Date | null;
  setCheckIn: React.Dispatch<SetStateAction<Date | null>>;
  checkOut: Date | null;
  setCheckOut: React.Dispatch<SetStateAction<Date | null>>;
  selectedOpt: OptionType | null;
  setSelectedOpt: React.Dispatch<SetStateAction<OptionType | null>>;
}

export const CalendarContext = createContext<ICalendarContext | null>(null);
export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error(
      'useCalendarContext must be used within CalendarContextProvider'
    );
  }

  return context;
};
