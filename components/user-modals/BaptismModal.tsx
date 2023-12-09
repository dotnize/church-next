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
import { createBaptism } from "~/actions/baptism";
import { getPriests } from "~/actions/priests";

export default function BaptismModal({
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
              const newId = await createBaptism(formData);
              router.push(`/status/b/${newId}`);
            }}
          >
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              Request Baptism Certificate
            </ModalHeader>
            <ModalBody className="flex-row p-8">
              <div className="flex w-full flex-col gap-8">
                <input type="hidden" name="requester_name" value={requesterName} />
                <input type="hidden" name="submitted_requirements" value={submittedRequirements} />
                <Input
                  autoFocus
                  isRequired
                  name="child_name"
                  label="Child Name"
                  placeholder="Enter Child Name"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  name="date_of_birth"
                  isRequired
                  type="date"
                  label="Date of Birth"
                  placeholder="Enter Date of Birth"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />

                <Input
                  autoFocus
                  label="Residence"
                  name="residence"
                  isRequired
                  placeholder="Enter residence"
                  variant="bordered"
                  labelPlacement="outside"
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
              </div>
              <div className="flex w-full flex-col gap-8">
                <Input
                  autoFocus
                  label="Birth Place"
                  isRequired
                  placeholder="Enter Birth Place"
                  name="birth_place"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Father's Name"
                  isRequired
                  name="fathers_name"
                  placeholder="Enter Father's Name"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  type="date"
                  isRequired
                  name="date_of_baptism"
                  label="Date of Baptism"
                  placeholder="Enter date of Baptism"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />

                <Input
                  autoFocus
                  label="Sponsor 2"
                  isRequired
                  name="sponsor2"
                  placeholder="Enter sponsor 2"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
              </div>
              <div className="flex w-full flex-col gap-8">
                <Input
                  autoFocus
                  isRequired
                  label="Mother's Name"
                  name="mothers_name"
                  placeholder="Enter Mother's Name"
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
                {/* <Input
                  autoFocus
                  name="book_number"
                  pattern="[0-9]+"
                  isRequired
                  label="Book Number"
                  placeholder="Enter book number"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
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
