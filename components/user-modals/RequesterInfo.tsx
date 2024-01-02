"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { UploadDropzone } from "~/lib/uploadthing";
import { titleCase } from "~/lib/utils";
import BaptismModal from "./BaptismModal";
import ConfirmationModal from "./ConfirmationModal";
import DeathModal from "./DeathModal";
import MarriageModal from "./MarriageModal";

export default function RequesterInfo({
  type,
  disclosure,
}: {
  type: "confirmation" | "baptism" | "death" | "marriage";
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const [requesterName, setRequesterName] = useState("");
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);
  const inputDisclosure = useDisclosure();

  return (
    <>
      {type === "baptism" && (
        <BaptismModal
          requesterName={requesterName}
          submittedRequirements={JSON.stringify(uploadedFileUrls)}
          disclosure={inputDisclosure}
        />
      )}
      {type === "confirmation" && (
        <ConfirmationModal
          requesterName={requesterName}
          submittedRequirements={JSON.stringify(uploadedFileUrls)}
          disclosure={inputDisclosure}
        />
      )}
      {type === "death" && (
        <DeathModal
          requesterName={requesterName}
          submittedRequirements={JSON.stringify(uploadedFileUrls)}
          disclosure={inputDisclosure}
        />
      )}
      {type === "marriage" && (
        <MarriageModal
          requesterName={requesterName}
          submittedRequirements={JSON.stringify(uploadedFileUrls)}
          disclosure={inputDisclosure}
        />
      )}
      <Modal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {titleCase(type)} Certificate Request
              </ModalHeader>
              <ModalBody>
                <Input
                  variant="faded"
                  label="Requester's Name"
                  labelPlacement="outside"
                  placeholder="Enter your name"
                  value={requesterName}
                  onValueChange={setRequesterName}
                />
                <div className="flex flex-col gap-1 rounded-md border-2 border-neutral-200 bg-neutral-50 p-2 text-xs">
                  Reminder, please provide the following requirements for {titleCase(type)}{" "}
                  Certificate to be processed:
                  {type === "confirmation" ? (
                    <>
                      <div>
                        - <span className="font-bold">Birth certificate</span> (PSA/NSO)
                      </div>
                      <div>
                        - Amount to pay for request is <span className="font-bold">PHP 100.00</span>
                      </div>
                    </>
                  ) : type === "death" ? (
                    <>
                      <div>
                        -{" "}
                        <span className="font-bold">
                          Authentic death certificate from Municipal
                        </span>{" "}
                        (PSA/NSO)
                      </div>
                      <div>
                        - Amount to pay for request is <span className="font-bold">PHP 100.00</span>
                      </div>
                    </>
                  ) : type === "marriage" ? (
                    <>
                      <div>
                        - <span className="font-bold">Birth certificates</span> (PSA/NSO) for groom
                        and bride
                      </div>
                      <div>
                        - <span className="font-bold">Certificates of no marriage (CENOMAR)</span>{" "}
                        (PSA/NSO) for groom and bride
                      </div>
                      <div>
                        - <span className="font-bold">Seminar</span> from Pre-Marriage Counseling
                        (Every Tuesday: 8:00 AM up to 5:00 PM) for groom and bride
                      </div>
                      <div>
                        - <span className="font-bold">Barangay Certificate</span> (groom and bride)
                        for residency
                      </div>
                      <div>
                        - <span className="font-bold">Valid IDs</span> (groom and bride)
                      </div>
                      <div className="font-bold">
                        NOTE: At least 4 photocopies of each documents.
                      </div>
                      <div>
                        - Amount to pay for request is <span className="font-bold">PHP 325.00</span>{" "}
                        for Marriage License
                      </div>
                      <div>
                        - Amount to pay for request is <span className="font-bold">PHP 300.00</span>{" "}
                        additional fee for solemnization / Civil Wedding
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        - <span className="font-bold">Birth certificate</span> (PSA/NSO)
                      </div>
                      <div>
                        - Amount to pay for request is <span className="font-bold">PHP 100.00</span>
                      </div>
                    </>
                  )}
                </div>
                <p>Attach the required document(s) below to proceed.</p>
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    const oldLinks = [...uploadedFileUrls];
                    oldLinks.push(...res.map((r) => r.url));
                    setUploadedFileUrls(oldLinks);
                  }}
                  config={{ mode: "auto" }}
                  endpoint="imageUploader"
                />
                <div className="flex h-24 flex-wrap gap-2">
                  {uploadedFileUrls.map((file, i) => (
                    <div className="relative" key={i}>
                      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-2 bg-black bg-opacity-20 opacity-0 transition hover:opacity-100">
                        <a
                          href={file}
                          target="_blank"
                          className="rounded-md bg-white px-2 py-1 text-xs"
                        >
                          View
                        </a>
                        <button
                          onClick={() => {
                            const oldLinks = [...uploadedFileUrls];
                            oldLinks.splice(i, 1);
                            setUploadedFileUrls(oldLinks);
                          }}
                          className="rounded-md bg-red-300 px-2 py-1 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                      <img alt="uploaded file" src={file} width="72" className="object-cover" />
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (!requesterName) {
                      alert("Requester's name must not be empty.");
                      return;
                    }
                    if (!uploadedFileUrls || !uploadedFileUrls.length) {
                      alert("At least 1 file must be uploaded.");
                      return;
                    }
                    onClose();
                    inputDisclosure.onOpen();
                  }}
                >
                  Next
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
