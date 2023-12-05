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

export default function RequesterInfo({
  type,
  disclosure,
}: {
  type: "confirmation" | "baptism" | "death" | "marriage";
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  return (
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
              />
              <CheckboxGroup>
                <Checkbox value="birth">Birth Certificate/NSO</Checkbox>
                <Checkbox value="baptismal-orig">Baptismal Certificate (Original)</Checkbox>
                <Checkbox value="baptismal-photocopy">Baptismal Certificate (Photocopy)</Checkbox>
                <Checkbox value="valid-id">Valid ID (Requester&apos;s ID)</Checkbox>
              </CheckboxGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Submit Request
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
