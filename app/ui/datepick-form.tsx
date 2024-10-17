"use client";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ja } from "date-fns/locale/ja";

export default function DatepickForm() {
  registerLocale("ja", ja);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <div>
      <DatePicker
        showIcon
        locale="ja"
        dateFormat="yyyy/MM/dd"
        minDate={new Date()}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
}
