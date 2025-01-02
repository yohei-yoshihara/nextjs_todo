"use client";

import { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { dayNames, monthNames } from "@/app/ui/date-picker/date-picker-consts";
import { makeCalendar } from "@/app/ui/date-picker/date-picker-utils";

type Props = {
  selected: Date;
  onChange: (date: Date) => void;
};

export default function DatePickerCalendar(props: Props) {
  function onPrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }
  function onNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }
  function onClickDate(date: Date) {
    setCurrentDate(date.getDate());
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
    props.onChange(date);
  }

  const [currentDate, setCurrentDate] = useState(props.selected.getDate());
  const [currentMonth, setCurrentMonth] = useState(props.selected.getMonth());
  const [currentYear, setCurrentYear] = useState(props.selected.getFullYear());

  const calendar = makeCalendar(currentYear, currentMonth, "Monday");

  return (
    <div className="rounded-lg w-80">
      <div className="flex flex-row justify-between items-center mb-4">
        <button onClick={() => onPrevMonth()}>
          <SlArrowLeft />
        </button>
        {`${monthNames[currentMonth]} ${currentYear}`}
        <button onClick={() => onNextMonth()}>
          <SlArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-7 place-items-center mb-2">
        {dayNames.map((day) => {
          return (
            <div key={day} className="font-bold">
              {day}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-7 place-items-center">
        {calendar.map((d) => {
          let className = "p-1 ";
          className +=
            d.month == 0 ? "font-bold text-gray-900 " : "text-gray-700 ";
          className +=
            d.dateValue.getFullYear() === currentYear &&
            d.dateValue.getMonth() === currentMonth &&
            d.dateValue.getDate() === currentDate
              ? "bg-blue-300 rounded-md"
              : "";
          return (
            <div
              key={d.date + d.month * 100}
              className={className}
              onClick={() => onClickDate(d.dateValue)}>
              {d.date}
            </div>
          );
        })}
      </div>
    </div>
  );
}
