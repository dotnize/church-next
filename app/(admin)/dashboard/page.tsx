"use client";

import { Card, CardBody } from "@nextui-org/react";
import { compareAsc, isToday } from "date-fns";
import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { getBaptisms } from "~/actions/baptism";
import { getConfirmations } from "~/actions/confirmation";
import { getDeceased } from "~/actions/deceased";
import { getMarriages } from "~/actions/marriage";
import { getMassReservations } from "~/actions/massreservation";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Dashboard() {
  const [baptism, setBaptism] = useState<any>([]);
  const [confirmation, setConfirmation] = useState<any>([]);
  const [marriage, setMarriage] = useState<any>([]);
  const [deceased, setDeceased] = useState<any>([]);
  const [reservations, setReservations] = useState<any>([]);

  async function fetchBaptism() {
    const data = await getBaptisms();
    setBaptism(data);
  }

  async function fetchConfirmation() {
    const data = await getConfirmations();
    setConfirmation(data);
  }

  async function fetchMarriage() {
    const data = await getMarriages();
    setMarriage(data);
  }

  async function fetchDeceased() {
    const data = await getDeceased();
    setDeceased(data);
  }

  async function fetchReservations() {
    const data = await getMassReservations();
    setReservations(data);
  }

  useEffect(() => {
    fetchBaptism();
    fetchConfirmation();
    fetchMarriage();
    fetchDeceased();
    fetchReservations();
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
      <div className="flex flex-col gap-8">
        <div className="text-4xl font-bold">Dashboard</div>
        <div className="flex gap-6">
          <div className="rounded-2xl bg-white px-4 py-8 shadow-md">
            <LineChart
              width={800}
              height={400}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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
    </div>
  );
}
