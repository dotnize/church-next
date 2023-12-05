"use client";

import { Button, Card, CardBody, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import RequesterInfo from "~/components/user-modals/RequesterInfo";

export default function UserPage() {
  const confirmationDisclosure = useDisclosure();
  const baptismDisclosure = useDisclosure();
  const deathDisclosure = useDisclosure();
  const marriageDisclosure = useDisclosure();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <RequesterInfo type="confirmation" disclosure={confirmationDisclosure} />
      <RequesterInfo type="baptism" disclosure={baptismDisclosure} />
      <RequesterInfo type="death" disclosure={deathDisclosure} />
      <RequesterInfo type="marriage" disclosure={marriageDisclosure} />

      <div className="flex items-center gap-2 text-xl font-bold">
        <Image src="/logo.png" alt="Saint Michael Parish Church" width={64} height={64} />
        Saint Michael Parish Church
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Card className="h-64 w-64 transform transition-transform hover:scale-110">
            <Button onClick={confirmationDisclosure.onOpen} className="h-64 w-64 bg-white">
              <CardBody className="flex items-center justify-center font-bold">
                <p className="text-2xl">Confirmation</p>
                <p className="text-2xl">Certificate</p>
              </CardBody>
            </Button>
          </Card>
          <Card className="h-64 w-64 transform transition-transform hover:scale-110">
            <Button onClick={baptismDisclosure.onOpen} className="h-64 w-64 bg-white">
              <CardBody className="flex items-center justify-center font-bold">
                <p className="text-2xl">Baptism</p>
                <p className="text-2xl">Certificate</p>
              </CardBody>
            </Button>
          </Card>
        </div>
        <div className="flex gap-4">
          <Card className="h-64 w-64 transform transition-transform hover:scale-110">
            <Button onClick={deathDisclosure.onOpen} className="h-64 w-64 bg-white">
              <CardBody className="flex items-center justify-center font-bold">
                <p className="text-2xl">Death Certificate</p>
              </CardBody>
            </Button>
          </Card>
          <Card className="h-64 w-64 transform  transition-transform hover:scale-110">
            <Button onClick={marriageDisclosure.onOpen} className="h-64 w-64 bg-white">
              <CardBody className="flex items-center justify-center font-bold">
                <p className="text-2xl">Marriage</p>
                <p className="text-2xl">Certificate</p>
              </CardBody>
            </Button>
          </Card>
        </div>
      </div>
      <Link href="/login" className="font-semibold transition-all hover:underline">
        Login to dashboard →
      </Link>
    </div>
  );
}
