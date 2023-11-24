"use client";

import { IconMenu2 } from "@tabler/icons-react";
import {
  compareAsc,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameMonth,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState } from "react";

export default function Calendar() {
  const today = startOfToday();
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy")); // TODO: select months in sidebar
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const [selectedDate, setSelectedDate] = useState(startOfToday);
  const [showMonths, setShowMonths] = useState(false);

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  return (
    <div className="flex justify-center p-8">
      <div className="flex overflow-hidden rounded-lg border-2 border-black bg-white">
        <div
          className={`relative h-full bg-indigo-400 transition-all ${showMonths ? "w-48" : "w-0"}`}
        >
          <button
            onClick={() => setShowMonths(!showMonths)}
            className="absolute -right-9 z-10 rounded-br-lg bg-indigo-400 p-1.5 text-indigo-50"
          >
            <IconMenu2 />
          </button>
          <div className={`transition-all ${!showMonths && "-z-10 select-none opacity-0"}`}>
            todo list months
          </div>
        </div>
        <div className="ml-9 h-[564px] w-[600px] py-4">
          <p className="flex justify-center text-2xl font-semibold uppercase text-indigo-500">
            {format(firstDayOfMonth, "MMMM yyyy")}
          </p>
          <hr className="my-6" />
          <div className="grid grid-cols-7 place-items-center gap-6 sm:gap-12">
            {days.map((day, idx) => {
              return (
                <div key={idx} className="font-semibold capitalize">
                  {day}
                </div>
              );
            })}
          </div>
          <div className="mt-4 grid grid-cols-7 place-items-center gap-6 sm:gap-8">
            {daysInMonth.map((day, idx) => {
              return (
                <div key={idx} className={colStartClasses[getDay(day)]}>
                  <p
                    onClick={() => setSelectedDate(day)}
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full font-semibold ${
                      isSameMonth(day, firstDayOfMonth) ? "text-gray-950" : "text-gray-300"
                    } ${compareAsc(day, selectedDate) !== 0 && "hover:bg-gray-200"} ${
                      compareAsc(day, selectedDate) === 0 && "bg-indigo-500 !text-gray-50"
                    }`}
                  >
                    {format(day, "d")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex h-full w-64 flex-col items-center gap-8 bg-gray-200 p-4">
          <h2 className="mt-4 text-xl font-semibold">{format(selectedDate, "MMMM d, yyyy")}</h2>
          <div className="rounded-md border-2 border-indigo-400 bg-indigo-100 p-2 text-indigo-900">
            No events for this day. Take a rest :)
          </div>
        </div>
      </div>
    </div>
  );
}
