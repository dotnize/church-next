"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createDeceased } from "~/actions/deceased";
import { getPriests } from "~/actions/priests";

export default function DeathModal({
  requesterName,
  submittedRequirements,
  disclosure,
}: {
  requesterName: string;
  submittedRequirements: string;
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const [priests, setPriests] = useState<any>([]);
  const router = useRouter();

  async function fetchPriests() {
    const priestData = await getPriests();
    setPriests(priestData);
  }

  useEffect(() => {
    fetchPriests();
  }, []);

  return (
    <Modal
      isOpen={disclosure.isOpen}
      onOpenChange={disclosure.onOpenChange}
      placement="top-center"
      size="5xl"
    >
      <ModalContent>
        {(onClose) => (
          <form
            action={async (formData) => {
              const newId = await createDeceased(formData);
              router.push(`/status/d/${newId}`);
            }}
          >
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              Request Death Certificate
            </ModalHeader>
            <ModalBody className="flex-row p-8">
              <div className="flex w-full flex-col gap-8">
                <input type="hidden" name="requester_name" value={requesterName} />
                <input type="hidden" name="submitted_requirements" value={submittedRequirements} />
                <Input
                  autoFocus
                  label="Name of Deceased"
                  isRequired
                  name="deceasedName"
                  placeholder="Enter name of deceased"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Age"
                  pattern="[0-9]+"
                  isRequired
                  name="age"
                  placeholder="Enter age"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />

                <Input
                  autoFocus
                  label="Date of Burial"
                  isRequired
                  name="dateOfBurial"
                  placeholder="Enter date of burial"
                  variant="bordered"
                  labelPlacement="outside"
                  type="date"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Relative Information"
                  isRequired
                  name="relativeInfo"
                  placeholder="Enter relative information"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Select
                  autoFocus
                  label="Parish Priest"
                  isRequired
                  name="parish_priest"
                  placeholder="Select parish priest"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                >
                  {priests.map((priest) => (
                    <SelectItem value={priest.name} key={priest.name}>
                      {priest.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex w-full flex-col gap-8">
                <Input
                  autoFocus
                  label="Residence"
                  isRequired
                  name="residence"
                  placeholder="Enter residence"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  type="date"
                  isRequired
                  label="Date of Death"
                  name="dateOfDeath"
                  placeholder="Enter date of death"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Place of Burial"
                  isRequired
                  name="placeOfBurial"
                  placeholder="Enter place of burial"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  isRequired
                  label="Burial Information"
                  name="burialInfo"
                  placeholder="Enter burial information"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
              </div>
              {/* <Input
                  autoFocus
                  isRequired
                  label="Volume Number"
                  pattern="[0-9]+"
                  name="volume"
                  placeholder="Enter volume number"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Page Number"
                  pattern="[0-9]+"
                  isRequired
                  name="pageNumber"
                  placeholder="Enter page number"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Entry Number"
                  pattern="[0-9]+"
                  isRequired
                  name="entryNumber"
                  placeholder="Enter entry number"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                /> */}
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
