"use client";

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
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
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const submittedRequirements = selectedRequirements.join(", ");
  const inputDisclosure = useDisclosure();

  // TODO: control checkbox values based on state above

  return (
    <>
      {type === "baptism" && (
        <BaptismModal
          requesterName={requesterName}
          submittedRequirements={submittedRequirements}
          disclosure={inputDisclosure}
        />
      )}
      {type === "confirmation" && (
        <ConfirmationModal
          requesterName={requesterName}
          submittedRequirements={submittedRequirements}
          disclosure={inputDisclosure}
        />
      )}
      {type === "death" && (
        <DeathModal
          requesterName={requesterName}
          submittedRequirements={submittedRequirements}
          disclosure={inputDisclosure}
        />
      )}
      {type === "marriage" && (
        <MarriageModal
          requesterName={requesterName}
          submittedRequirements={submittedRequirements}
          disclosure={inputDisclosure}
        />
      )}
      <Modal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Request Confirmation</ModalHeader>
              <ModalBody>
                <Input
                  label="Requester's Name"
                  labelPlacement="outside"
                  placeholder="Enter your name"
                  value={requesterName}
                  onValueChange={setRequesterName}
                />
                <CheckboxGroup>
                  <Checkbox
                    value="Birth certificate"
                    onValueChange={(value) => {
                      if (value) {
                        if (!selectedRequirements.includes("Birth certificate"))
                          setSelectedRequirements([...selectedRequirements, "Birth certificate"]);
                      } else {
                        setSelectedRequirements(
                          selectedRequirements.filter(
                            (requirement) => requirement !== "Birth certificate"
                          )
                        );
                      }
                    }}
                  >
                    Birth Certificate/NSO
                  </Checkbox>
                  <Checkbox
                    value="Original Baptismal Certificate"
                    onValueChange={(value) => {
                      if (value) {
                        if (!selectedRequirements.includes("Original Baptismal Certificate"))
                          setSelectedRequirements([
                            ...selectedRequirements,
                            "Original Baptismal Certificate",
                          ]);
                      } else {
                        setSelectedRequirements(
                          selectedRequirements.filter(
                            (requirement) => requirement !== "Original Baptismal Certificate"
                          )
                        );
                      }
                    }}
                  >
                    Baptismal Certificate (Original)
                  </Checkbox>
                  <Checkbox
                    value="Baptismal Certificate (photocopy)"
                    onValueChange={(value) => {
                      if (value) {
                        if (!selectedRequirements.includes("Baptismal Certificate (photocopy)")) {
                          setSelectedRequirements([
                            ...selectedRequirements,
                            "Baptismal Certificate (photocopy)",
                          ]);
                        }
                      } else {
                        setSelectedRequirements(
                          selectedRequirements.filter(
                            (requirement) => requirement !== "Baptismal Certificate (photocopy)"
                          )
                        );
                      }
                    }}
                  >
                    Baptismal Certificate (Photocopy)
                  </Checkbox>
                  <Checkbox
                    value="Valid ID"
                    onValueChange={(value) => {
                      if (value) {
                        if (!selectedRequirements.includes("Valid ID")) {
                          setSelectedRequirements([...selectedRequirements, "Valid ID"]);
                        }
                      } else {
                        setSelectedRequirements(
                          selectedRequirements.filter((requirement) => requirement !== "Valid ID")
                        );
                      }
                    }}
                  >
                    Valid ID (Requester&apos;s ID)
                  </Checkbox>
                </CheckboxGroup>
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
                    if (selectedRequirements.length === 0) {
                      alert("At least 1 requirement must be submitted.");
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
