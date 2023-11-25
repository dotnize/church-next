"use client";

import { Tab, Tabs } from "@nextui-org/react";
import BaptismCert from "~/components/cert/BaptismCertTable";
import ConfirmationCert from "~/components/cert/ConfirmationCertTable";
import DeathCert from "~/components/cert/DeathCertTable";
import MarriageCert from "~/components/cert/MarriageCertTable";

export default function Certificates() {
  return (
    <div className="justifiy-center flex h-full flex-col p-8">
      <Tabs
        aria-label="Options"
        radius="lg"
        variant="bordered"
        size="lg"
        color="primary"
        className="self-center"
      >
        <Tab key="confirmation" title="Confirmation Certificate">
          <ConfirmationCert />
        </Tab>
        <Tab key="baptism" title="Baptism Certificate">
          <BaptismCert />
        </Tab>
        <Tab key="death" title="Death Certificate">
          <DeathCert />
        </Tab>
        <Tab key="marriage" title="Marriage Certificate">
          <MarriageCert />
        </Tab>
      </Tabs>
    </div>
  );
}
