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
import { createMarriage } from "~/actions/marriage";
import { getPriests } from "~/actions/priests";

export default function MarriageModal({
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
  const [husbandFields, setHusbandFields] = useState(false);

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
              const newId = await createMarriage(formData);
              router.push(`/status/m/${newId}`);
            }}
          >
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              Request Marriage Certificate
            </ModalHeader>
            <ModalBody className="flex-row p-8">
              <div className="flex w-full flex-col gap-8">
                <input type="hidden" name="requester_name" value={requesterName} />
                <input type="hidden" name="submitted_requirements" value={submittedRequirements} />
                <Input
                  className={
                    husbandFields ? undefined : "pointer-events-none absolute -z-50 opacity-0"
                  }
                  autoFocus
                  label="Husband Name"
                  isRequired
                  placeholder="Enter husband name"
                  name="husband_name"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  className={
                    husbandFields ? undefined : "pointer-events-none absolute -z-50 opacity-0"
                  }
                  label="Husband Actual Address"
                  name="husband_actual_address"
                  isRequired
                  placeholder="Enter husband address"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  className={
                    husbandFields ? undefined : "pointer-events-none absolute -z-50 opacity-0"
                  }
                  label="Husband Age"
                  pattern="[0-9]+"
                  name="husband_age"
                  isRequired
                  placeholder="Enter husband age"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />

                <Input
                  autoFocus
                  className={
                    husbandFields ? undefined : "pointer-events-none absolute -z-50 opacity-0"
                  }
                  label="Husband Place of Birth"
                  isRequired
                  name="husband_place_of_birth"
                  placeholder="Enter husband place of birth"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />

                <Select
                  autoFocus
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
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
                  label="Wife Witness"
                  name="wife_witness"
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  isRequired
                  placeholder="Enter witness"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Solemnization Place"
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  isRequired
                  name="solemnization_place"
                  placeholder="Enter solemnization place"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Wife's Mother Name"
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  isRequired
                  name="wife_mother"
                  placeholder="Enter wife's mother name"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Wife's Father Name"
                  name="wife_father"
                  isRequired
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  placeholder="Enter wife's father name"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
              </div>
              <div className="flex w-full flex-col gap-8">
                <Input
                  autoFocus
                  label="Husband's Mother Name"
                  isRequired
                  name="husband_mother"
                  className={
                    husbandFields ? undefined : "pointer-events-none absolute -z-50 opacity-0"
                  }
                  placeholder="Enter husband's mother name"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Husband's Father Name"
                  isRequired
                  name="husband_father"
                  className={
                    husbandFields ? undefined : "pointer-events-none absolute -z-50 opacity-0"
                  }
                  placeholder="Enter husband's father name"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Husband Date of Baptism"
                  name="husband_date_of_baptism"
                  isRequired
                  placeholder="Enter husband date of baptism"
                  variant="bordered"
                  labelPlacement="outside"
                  className={
                    husbandFields ? undefined : "pointer-events-none absolute -z-50 opacity-0"
                  }
                  type="date"
                  size="lg"
                />

                <Input
                  autoFocus
                  label="Solemnization Date"
                  isRequired
                  type="date"
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  name="solemnization_date"
                  placeholder="Enter solemnization date"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Wife Date of Baptism"
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  type="date"
                  name="wife_date_of_baptism"
                  isRequired
                  placeholder="Enter wife date of baptism"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Wife Place of Baptism"
                  name="wife_place_of_baptism"
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  isRequired
                  placeholder="Enter wife place of baptism"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Wife Legal Status"
                  isRequired
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  name="wife_legal_status"
                  placeholder="Enter legal status"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Date of Marriage"
                  isRequired
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  type="date"
                  name="date_of_marriage"
                  placeholder="Enter date of marriage"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
              </div>
              <div className="flex w-full flex-col gap-8">
                <Input
                  autoFocus
                  label="Husband Place of Baptism"
                  isRequired
                  name="husband_place_of_baptism"
                  placeholder="Enter husband place of baptism"
                  variant="bordered"
                  className={
                    husbandFields ? undefined : "pointer-events-none absolute -z-50 opacity-0"
                  }
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Husband Legal Status"
                  name="husband_legal_status"
                  isRequired
                  placeholder="Enter legal status"
                  variant="bordered"
                  labelPlacement="outside"
                  className={
                    husbandFields ? undefined : "pointer-events-none absolute -z-50 opacity-0"
                  }
                  size="lg"
                />
                <Input
                  autoFocus
                  className={
                    husbandFields ? undefined : "pointer-events-none absolute -z-50 opacity-0"
                  }
                  label="Husband Witness"
                  name="husband_witness"
                  isRequired
                  placeholder="Enter witness"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Wife Name"
                  placeholder="Enter wife name"
                  isRequired
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  name="wife_name"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Wife Actual Address"
                  isRequired
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  name="wife_actual_address"
                  placeholder="Enter wife address"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Wife Age"
                  pattern="[0-9]+"
                  name="wife_age"
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  isRequired
                  placeholder="Enter wife age"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />

                <Input
                  autoFocus
                  label="Wife Place of Birth"
                  name="wife_place_of_birth"
                  className={
                    husbandFields ? "pointer-events-none absolute -z-50 opacity-0" : undefined
                  }
                  isRequired
                  placeholder="Enter wife place of birth"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
              </div>

              {/* <Input
                  autoFocus
                  label="Position"
                  isRequired
                  name="position"
                  placeholder="Enter position"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                /> */}

              {/* <Input
                  autoFocus
                  label="Book Number"
                  isRequired
                  pattern="[0-9]+"
                  name="book_number"
                  placeholder="Enter book number"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                />
                <Input
                  autoFocus
                  label="Page Number"
                  pattern="[0-9]+"
                  isRequired
                  name="page_number"
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
                  name="entry_number"
                  placeholder="Enter entry number"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                /> */}
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onPress={husbandFields ? () => setHusbandFields(false) : onClose}
              >
                {husbandFields ? "Back" : "Close"}
              </Button>
              <Button
                color="primary"
                type={husbandFields ? "submit" : undefined}
                onPress={!husbandFields ? () => setHusbandFields(true) : undefined}
              >
                {husbandFields ? "Submit" : "Next"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
