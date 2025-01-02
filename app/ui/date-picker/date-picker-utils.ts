import dayjs from "dayjs";

type DayInfo = {
  date: number;
  month: -1 | 0 | 1;
  dateValue: Date;
};

export function translateDay(day: number, startDay: "Sunday" | "Monday") {
  if (startDay === "Sunday") {
    return day;
  } else {
    return day === 0 ? 6 : day - 1;
  }
}

export function makeCalendar(
  year: number,
  month: number,
  startDay: "Sunday" | "Monday" = "Monday"
): DayInfo[] {
  const start = dayjs(new Date(year, month, 1)).startOf("month");
  const end = dayjs(new Date(year, month, 1)).endOf("month");

  let result: DayInfo[] = [];

  let d = start;
  while (translateDay(d.day(), startDay) !== 0) {
    d = d.add(-1, "day");
    result.push({ date: d.date(), month: -1, dateValue: d.toDate() });
  }
  result = result.reverse();

  const daysInMonth = dayjs(new Date(year, month)).daysInMonth();
  for (let i = 0; i < daysInMonth; i++) {
    result.push({
      date: i + 1,
      month: 0,
      dateValue: new Date(year, month, i + 1),
    });
  }

  d = end;
  while (translateDay(d.day(), startDay) !== 6) {
    d = d.add(1, "day");
    result.push({ date: d.date(), month: 1, dateValue: d.toDate() });
  }

  if (result.length % 7 !== 0) {
    throw Error(
      "internal error: total number of days must be a value which is multiply by 7"
    );
  }

  return result;
}
