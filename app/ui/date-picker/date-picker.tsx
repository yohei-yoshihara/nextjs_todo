"use client";

import { IoCalendarOutline } from "react-icons/io5";
import Popover from "@/app/ui/popover";
import { useState } from "react";
import dayjs from "dayjs";
import DatePickerCalendar from "@/app/ui/date-picker/date-picker-calendar";

type Props = {
  name?: string;
  selected?: Date;
  onChange?: (date: Date) => void;
};

export default function DatePicker(props: Props) {
  function onDateChanged(date: Date) {
    setCurrentDate(date);
    if (onChange) {
      onChange(date);
    }
  }
  const { selected = new Date(), onChange } = props;
  const [currentDate, setCurrentDate] = useState(selected);

  const dateString = dayjs(currentDate).format("YYYY/MM/DD");

  return (
    <div>
      {props.name && (
        <input
          type="hidden"
          name={props.name}
          value={currentDate.toISOString()}
        />
      )}
      <Popover
        content={
          <DatePickerCalendar selected={currentDate} onChange={onDateChanged} />
        }>
        <div className="flex flex-row items-center">
          <div className="mr-2">
            <IoCalendarOutline />
          </div>
          <div>
            <span>{dateString}</span>
          </div>
        </div>
      </Popover>
    </div>
  );
}
