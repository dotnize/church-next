"use client";

import { Card, CardBody, Spinner } from "@nextui-org/react";
import { compareAsc, format, isSameDay, isToday } from "date-fns";
import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { getBaptisms } from "~/actions/baptism";
import { getConfirmations } from "~/actions/confirmation";
import { getDeceased } from "~/actions/deceased";
import { getMarriages } from "~/actions/marriage";
import { getMassReservations } from "~/actions/massreservation";
import { dateFormatter } from "~/lib/utils";

export default function Dashboard() {
  const [baptism, setBaptism] = useState<any>([]);
  const [confirmation, setConfirmation] = useState<any>([]);
  const [marriage, setMarriage] = useState<any>([]);
  const [deceased, setDeceased] = useState<any>([]);
  const [reservations, setReservations] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);

  async function fetchBaptism() {
    const res = await getBaptisms();
    setBaptism(res);
    return true;
  }

  async function fetchConfirmation() {
    const res = await getConfirmations();
    setConfirmation(res);
    return true;
  }

  async function fetchMarriage() {
    const res = await getMarriages();
    setMarriage(res);
    return true;
  }

  async function fetchDeceased() {
    const res = await getDeceased();
    setDeceased(res);
    return true;
  }

  async function fetchReservations() {
    const res = await getMassReservations();
    setReservations(res);
    return true;
  }

  function getCertData() {
    // 14 days ago, to today
    const dates = [];
    for (let i = -14; i < 1; i++) {
      dates.push(new Date(new Date().setDate(new Date().getDate() + i)));
    }

    const dateData = dates.map((date) => {
      const dateString = format(date, "yyyy-MM-dd");

      const bCount = baptism.filter(
        (baptism: any) =>
          baptism.status === "Released" && isSameDay(new Date(baptism.date_of_issue), date)
      ).length;

      const cCount = confirmation.filter(
        (confirmation: any) =>
          confirmation.status === "Released" &&
          isSameDay(new Date(confirmation.date_of_issue), date)
      ).length;
      const mCount = marriage.filter(
        (marriage: any) =>
          marriage.status === "Released" && isSameDay(new Date(marriage.date_of_issue), date)
      ).length;
      const dCount = deceased.filter(
        (deceased: any) =>
          deceased.status === "Released" && isSameDay(new Date(deceased.date_of_issue), date)
      ).length;

      const count = bCount + cCount + mCount + dCount;
      return { name: dateString, count };
    });
    setData(dateData);
  }

  async function fetchAll() {
    setLoading(true);
    await Promise.allSettled([
      fetchBaptism(),
      fetchConfirmation(),
      fetchMarriage(),
      fetchDeceased(),
      fetchReservations(),
    ]);
    setLoading(false);
  }

  useEffect(() => {
    getCertData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baptism, confirmation, marriage, deceased]);

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pendingCerts =
    baptism.filter((baptism: any) => baptism.status === "Pending").length +
    confirmation.filter((confirmation: any) => confirmation.status === "Pending").length +
    marriage.filter((marriage: any) => marriage.status === "Pending").length +
    deceased.filter((deceased: any) => deceased.status === "Pending").length;

  const releasedCerts =
    baptism.filter((baptism: any) => baptism.status === "Released").length +
    confirmation.filter((confirmation: any) => confirmation.status === "Released").length +
    marriage.filter((marriage: any) => marriage.status === "Released").length +
    deceased.filter((deceased: any) => deceased.status === "Released").length;

  const reservationsToday = reservations.filter((reservation: any) =>
    isToday(new Date(reservation.date_requested))
  ).length;
  const upcomingReservations = reservations.filter(
    (reservation: any) =>
      compareAsc(new Date(reservation.date_requested), new Date()) === 1 &&
      !isToday(new Date(reservation.date_requested))
  ).length;

  return (
    <div className="flex h-full items-center justify-center p-8">
      {loading && <Spinner />}
      {!loading && (
        <div className="flex flex-col gap-8">
          <div className="text-4xl font-bold">Dashboard</div>
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-10 shadow-md">
              <div className="text-xl">Released certificates for the past 2 weeks</div>
              <LineChart width={800} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tickFormatter={dateFormatter} />
                <YAxis type="number" domain={[0, "dataMax + 3"]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </div>
            <div className="flex flex-col justify-center gap-6">
              <Card className="bg-indigo-50">
                <CardBody className="flex flex-col items-end p-4">
                  <h2>Pending certificates</h2>
                  <span className="text-3xl font-bold">{pendingCerts}</span>
                </CardBody>
              </Card>
              <Card className="bg-emerald-50">
                <CardBody className="flex flex-col items-end p-4">
                  <h2>Released certificates</h2>
                  <span className="text-3xl font-bold">{releasedCerts}</span>
                </CardBody>
              </Card>
              <Card className="bg-orange-50">
                <CardBody className="flex flex-col items-end p-4">
                  <h2>Mass reservations today</h2>
                  <span className="text-3xl font-bold">{reservationsToday}</span>
                </CardBody>
              </Card>
              <Card className="bg-yellow-50">
                <CardBody className="flex flex-col items-end p-4">
                  <h2>Upcoming reservations</h2>
                  <span className="text-3xl font-bold">{upcomingReservations}</span>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
