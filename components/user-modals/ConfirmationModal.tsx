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
import { createConfirmation } from "~/actions/confirmation";
import { getPriests } from "~/actions/priests";

export default function ConfirmationModal({
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
              const newId = await createConfirmation(formData);
              router.push(`/status/c/${newId}`);
            }}
          >
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              Request Confirmation Certificate
            </ModalHeader>
            <ModalBody className="flex-row p-8">
              <div className="flex w-full flex-col gap-8">
                <input type="hidden" name="requester_name" value={requesterName} />
                <input type="hidden" name="submitted_requirements" value={submittedRequirements} />
                <Input
                  autoFocus
                  isRequired
                  label="Name"
                  placeholder="Enter Name"
                  name="name"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Mother's Name"
                  isRequired
                  name="mother_name"
                  placeholder="Enter Mother's Name"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />

                <Input
                  autoFocus
                  label="Date"
                  isRequired
                  name="date"
                  placeholder="Enter date"
                  variant="bordered"
                  labelPlacement="outside"
                  type="date"
                  size="lg"
                />

                <Input
                  autoFocus
                  label="Sponsor 1"
                  isRequired
                  name="sponsor1"
                  placeholder="Enter sponsor 1"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                {/* <Input
                  autoFocus
                  label="Page number"
                  pattern="[0-9]+"
                  isRequired
                  name="page_number"
                  placeholder="Enter page number"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                /> */}
              </div>
              <div className="flex w-full flex-col gap-8">
                <Input
                  autoFocus
                  label="Father's Name"
                  isRequired
                  name="father_name"
                  placeholder="Enter Father's Name"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Church Name"
                  isRequired
                  name="church_name"
                  placeholder="Enter church name"
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
                <Input
                  autoFocus
                  label="Sponsor 2"
                  name="sponsor2"
                  isRequired
                  placeholder="Enter sponsor 2"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                {/* <Input
                  autoFocus
                  label="Book Number"
                  pattern="[0-9]+"
                  isRequired
                  name="book_number"
                  placeholder="Enter book number"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                /> */}
              </div>
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
