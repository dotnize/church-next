"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { IconChevronLeft, IconChevronRight, IconMenu2 } from "@tabler/icons-react";
import {
  add,
  compareAsc,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  parse,
  setMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";
import { getMassReservations } from "~/actions/massreservation";
import { getPriests } from "~/actions/priests";

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

  const [reservations, setReservations] = useState<any>([]);
  const [priests, setPriests] = useState<any>([]);

  const [previewedReservationId, setPreviewedReservationId] = useState<any>(null);
  const previewedReservation = reservations.find((r) => r.id === previewedReservationId);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function fetchReservations() {
    const res = await getMassReservations();
    setReservations(res);
  }
  async function fetchPriests() {
    const res = await getPriests();
    setPriests(res);
  }
  useEffect(() => {
    fetchReservations();
    fetchPriests();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="text-3xl font-bold">Calendar</div>
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
              !showMonths && "pointer-events-none -z-10 opacity-0"
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
                    className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full font-semibold ${
                      isSameMonth(day, firstDayOfMonth) ? "text-gray-950" : "text-gray-300"
                    } ${!isSameDay(day, selectedDate) && "hover:bg-gray-200"} ${
                      isSameDay(day, selectedDate) && "bg-indigo-500 !text-gray-50"
                    }`}
                  >
                    {format(day, "d")}
                    {reservations.find((r) => isSameDay(r.date_requested, day)) && (
                      <div
                        className={`absolute bottom-0 h-1.5 w-1.5 rounded-full ${
                          compareAsc(day, new Date()) === 1 ? "bg-red-500" : "bg-emerald-500"
                        }`}
                      />
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex h-full w-80 flex-col items-center gap-8 bg-gray-200 p-4">
          <h2 className="mt-4 text-xl font-semibold">{format(selectedDate, "MMMM d, yyyy")}</h2>
          {!reservations.find((r) => isSameDay(r.date_requested, selectedDate)) && (
            <div className="rounded-md border-2 border-indigo-400 bg-indigo-100 p-2 text-indigo-900">
              No scheduled reservations for this day.
            </div>
          )}
          <div className="flex flex-col gap-8">
            {reservations
              .filter((r) => isSameDay(r.date_requested, selectedDate))
              .map((r, i) => (
                <div className="group flex items-center gap-2" key={i}>
                  <div
                    className={`h-3 w-3 rounded-full ${
                      compareAsc(selectedDate, new Date()) === 1 ? "bg-red-500" : "bg-emerald-500"
                    }`}
                  ></div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="font-bold">{r.type_of_mass}</div>
                      <button
                        onClick={() => {
                          setPreviewedReservationId(r.id);
                          onOpen();
                        }}
                        className="rounded-md bg-sky-100 px-4 py-1 text-xs transition-colors group-hover:bg-sky-50"
                      >
                        View
                      </button>
                    </div>
                    <div className="text-sm">
                      {format(new Date(`2021-01-01 ${r.schedule_time_start}`), "hh:mm a")} -{" "}
                      {priests.find((p) => p.id === r.priest_id)?.name}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Reservation details</ModalHeader>
                  <ModalBody>
                    <p>
                      <span className="font-bold">Type of Mass: </span>
                      {previewedReservation?.type_of_mass}
                    </p>
                    <p>
                      <span className="font-bold">Location: </span>
                      {previewedReservation?.place_of_mass_event}
                    </p>
                    <p>
                      <span className="font-bold">Date Requested: </span>
                      {format(previewedReservation?.date_requested, "yyyy-MM-dd")}
                    </p>
                    <p>
                      <span className="font-bold">Schedule Time Start: </span>
                      {format(
                        new Date(`2021-01-01 ${previewedReservation?.schedule_time_start}`),
                        "hh:mm a"
                      )}
                    </p>
                    <p>
                      <span className="font-bold">Mass Presider: </span>
                      {priests.find((p) => p.id === previewedReservation.priest_id)?.name}
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button onPress={onClose}>Close</Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
