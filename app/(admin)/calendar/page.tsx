"use client";

import { IconChevronLeft, IconChevronRight, IconMenu2 } from "@tabler/icons-react";
import {
  add,
  compareAsc,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameMonth,
  parse,
  setMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState } from "react";

export default function Calendar() {
  const today = startOfToday();
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const [selectedDate, setSelectedDate] = useState(startOfToday);
  const [showMonths, setShowMonths] = useState(false);

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  const getPrevYear = () => {
    const prevYearMonth = add(firstDayOfMonth, { years: -1 });
    setCurrMonth(format(prevYearMonth, "MMM-yyyy"));
  };
  const getNextYear = () => {
    const prevYearMonth = add(firstDayOfMonth, { years: 1 });
    setCurrMonth(format(prevYearMonth, "MMM-yyyy"));
  };

  return (
    <div className="flex justify-center p-8">
      <div className="flex space-x-4 overflow-hidden rounded-lg border-2 border-black bg-white">
        <div
          className={`relative h-full bg-indigo-400 text-indigo-50 transition-all ${
            showMonths ? "w-44" : "w-0"
          }`}
        >
          <button
            onClick={() => setShowMonths(!showMonths)}
            className="absolute -right-10 z-10 rounded-br-lg bg-indigo-400 p-1.5"
          >
            <IconMenu2 size={30} />
          </button>
          <div
            className={`flex h-full flex-col items-center justify-center gap-2 text-lg font-semibold transition-all ${
              !showMonths && "-z-10 select-none opacity-0"
            }`}
          >
            <div className="flex items-center gap-1 text-2xl">
              <IconChevronLeft className="cursor-pointer" onClick={getPrevYear} size={32} />
              {firstDayOfMonth.getFullYear()}
              <IconChevronRight className="cursor-pointer" onClick={getNextYear} size={32} />
            </div>
            <div className="flex w-full flex-col">
              {months.map((m, i) => (
                <div
                  className={`cursor-pointer p-1.5 px-8 hover:bg-indigo-300 ${
                    firstDayOfMonth.getMonth() === i && "bg-indigo-500"
                  }`}
                  key={m}
                  onClick={() => setCurrMonth(format(setMonth(firstDayOfMonth, i), "MMM-yyyy"))}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[564px] w-[600px] py-4">
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
