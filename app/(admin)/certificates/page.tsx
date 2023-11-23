"use client";

import { Button, Card, CardBody } from "@nextui-org/react";

export default function Certificates() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="flex gap-5">
        <Card className="h-64 w-64 transform transition-transform hover:scale-110">
          <Button className="h-64 w-64 bg-white">
            <CardBody className="flex items-center justify-center font-bold">
              <p className="text-2xl">Confirmation</p>
              <p className="text-2xl">Certificate</p>
            </CardBody>
          </Button>
        </Card>
        <Card className="h-64 w-64 transform transition-transform hover:scale-110">
          <Button className="h-64 w-64 bg-white">
            <CardBody className="flex items-center justify-center font-bold">
              <p className="text-2xl">Baptism</p>
              <p className="text-2xl">Certificate</p>
            </CardBody>
          </Button>
        </Card>
      </div>
      <div className="flex gap-5">
        <Card className="h-64 w-64 transform transition-transform hover:scale-110">
          <Button className="h-64 w-64 bg-white">
            <CardBody className="flex items-center justify-center font-bold">
              <p className="text-2xl">Death Certificate</p>
            </CardBody>
          </Button>
        </Card>
        <Card className="h-64 w-64 transform  transition-transform hover:scale-110">
          <Button className="h-64 w-64 bg-white">
            <CardBody className="flex items-center justify-center font-bold">
              <p className="text-2xl">Marriage</p>
              <p className="text-2xl">Certificate</p>
            </CardBody>
          </Button>
        </Card>
      </div>
    </div>
  );
}
