import React from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarProps {
  onWeekSelect: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onWeekSelect }) => {
  return (
    <ReactCalendar
      onChange={onWeekSelect}
      view="month"
      onClickWeek={onWeekSelect}
    />
  );
};
