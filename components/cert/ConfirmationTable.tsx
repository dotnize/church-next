"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  createConfirmation,
  deleteConfirmation,
  getConfirmations,
  updateConfirmation,
} from "~/actions/confirmation";
import { getPriests } from "~/actions/priests";

export default function ConfirmationCert() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // TODO: move to main/default component
  const [priests, setPriests] = useState<any>([]);
  const [confirmations, setConfirmations] = useState<any>([]);
  // for modal
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const columns = [
    { header: "Name", key: "name" },
    { header: "Father's Name", key: "father_name" },
    { header: "Mother's Name", key: "mother_name" },
    { header: "Church Name", key: "church_name" },
    { header: "Month", key: "month" },
    { header: "Date", key: "day" },
    { header: "Year", key: "year" },
    { header: "Sponsor 1", key: "sponsor1" },
    { header: "Sponsor 2", key: "sponsor2" },
    { header: "Book Number", key: "book_number" },
    { header: "Page Number", key: "page_number" },
    { header: "Date of Issue", key: "date_of_issue" },
    { header: "Parish Priest", key: "parish_priest" },
    { header: "Actions", key: "actions" },
  ];

  async function fetchPriests() {
    const priestData = await getPriests();
    setPriests(priestData);
  }

  async function fetchConfirmations() {
    const confirmationData = await getConfirmations();

    if (Array.isArray(confirmationData)) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const updatedData = confirmationData.map((item) => {
        const date = new Date(item.date);

        return {
          ...item,
          day: date.getDate(),
          month: monthNames[date.getMonth()],
          year: date.getFullYear(),
        };
      });

      setConfirmations(updatedData);
    }
  }

  useEffect(() => {
    fetchPriests();
    fetchConfirmations();
  }, []);

  function Top() {
    return (
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Confirmation Certificate</h2>
        <Button
          className="text-xl"
          size="lg"
          color="primary"
          onPress={() => {
            setSelectedId(null);
            onOpen();
          }}
        >
          Add Confirmation Certificate
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="5xl">
          <ModalContent>
            {(onClose) => (
              <form
                action={async (formData) => {
                  selectedId === null
                    ? await createConfirmation(formData)
                    : await updateConfirmation(formData);
                  fetchConfirmations();
                  onClose();
                }}
              >
                <ModalHeader className="flex flex-col gap-1 text-2xl">
                  {selectedId === null ? "Add" : "Edit"} Confirmation Certificate
                </ModalHeader>
                <ModalBody className="flex-row p-8">
                  <div className="flex w-full flex-col gap-8">
                    {selectedId && <input type="hidden" name="id" value={selectedId} />}
                    <Input
                      autoFocus
                      label="Name"
                      placeholder="Enter Name"
                      name="name"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.name
                          : undefined
                      }
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Mother's Name"
                      name="mother_name"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.mother_name
                          : undefined
                      }
                      placeholder="Enter Mother's Name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />

                    <Input
                      autoFocus
                      label="Date"
                      name="date"
                      defaultValue={
                        selectedId
                          ? format(
                              confirmations.find((d) => d.id === selectedId)?.date,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      placeholder="Enter date"
                      variant="bordered"
                      labelPlacement="outside"
                      type="date"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Sponsor 2"
                      name="sponsor2"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.sponsor2
                          : undefined
                      }
                      placeholder="Enter sponsor 2"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Page number"
                      name="page_number"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.page_number
                          : undefined
                      }
                      placeholder="Enter page number"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Select
                      autoFocus
                      label="Parish Priest"
                      defaultSelectedKeys={
                        selectedId
                          ? [
                              confirmations
                                .find((d) => d.id === selectedId)
                                ?.parish_priest.toString(),
                            ]
                          : undefined
                      }
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
                      label="Father's Name"
                      name="father_name"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.father_name
                          : undefined
                      }
                      placeholder="Enter Father's Name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Church Name"
                      name="church_name"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.church_name
                          : undefined
                      }
                      placeholder="Enter church name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Sponsor 1"
                      name="sponsor1"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.sponsor1
                          : undefined
                      }
                      placeholder="Enter sponsor 1"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Book Number"
                      name="book_number"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.book_number
                          : undefined
                      }
                      placeholder="Enter book number"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      type="date"
                      label="Date of Issue"
                      name="date_of_issue"
                      defaultValue={
                        selectedId
                          ? format(
                              confirmations.find((d) => d.id === selectedId)?.date_of_issue,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      placeholder="Enter date of issue"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    {selectedId === null ? "Create" : "Save"}
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <Table topContent={<Top />}>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.header}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {confirmations.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "actions" ? (
                    <Dropdown>
                      <DropdownTrigger>
                        <Button endContent={<IconCaretDownFilled />} variant="bordered">
                          Actions
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Dynamic Actions"
                        onAction={async (key) => {
                          if (key === "edit") {
                            setSelectedId(row.id);
                            onOpen();
                          } else if (key === "delete") {
                            await deleteConfirmation(row.id);
                            window?.location?.reload();
                          }
                        }}
                      >
                        <DropdownItem key="edit">Edit</DropdownItem>
                        <DropdownItem key="delete" color="danger" className="text-danger">
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : column.key === "date_of_issue" || column.key === "date" ? (
                    row[column.key]?.toDateString()
                  ) : (
                    row[column.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
