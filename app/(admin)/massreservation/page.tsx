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
import { differenceInHours, format } from "date-fns";
import { useEffect, useState } from "react";

import {
  createMassReservation,
  deleteMassReservation,
  getMassReservations,
  updateMassReservation,
} from "~/actions/massreservation";
import { getPriests } from "~/actions/priests";
import { massHours, massTypes, minHoursBeforeReservation } from "~/lib/config";

export default function MassReservation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [priests, setPriests] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  // for modal
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const columns = [
    { header: "Requester's Name", key: "requester_name" },
    { header: "Contact Number", key: "contact_number" },
    { header: "Type of Mass", key: "type_of_mass" },
    { header: "Mass Presider", key: "priest_id" },
    { header: "Place of Mass Event", key: "place_of_mass_event" },
    { header: "Date Requested", key: "date_requested" },
    { header: "Schedule Time Start", key: "schedule_time_start" },
    { header: "Schedule Time End", key: "schedule_time_end" },
    { header: "Actions", key: "actions" },
  ];

  async function fetchPriests() {
    const priestData = await getPriests();
    setPriests(priestData);
  }
  async function fetchReservations() {
    const reservationData = await getMassReservations();
    setData(reservationData);
  }
  useEffect(() => {
    fetchPriests();
    fetchReservations();
  }, []);

  function validateForm(formData: FormData) {
    const dateRequested = formData.get("date_requested").toString();
    const timeStart = formData.get("time")?.toString().split(" - ")[0];

    const selectedDate = new Date(dateRequested + " " + timeStart);
    const today = new Date();

    const diff = differenceInHours(selectedDate, today);
    console.log("diff", diff);

    if (differenceInHours(selectedDate, today) < minHoursBeforeReservation) {
      alert(`Reservation must be at least ${minHoursBeforeReservation} hours from now.`);
      return false;
    }

    return true;
  }

  function Top() {
    return (
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Mass Reservation</h2>
        <Button
          className="text-xl"
          size="lg"
          color="primary"
          onPress={() => {
            setSelectedId(null);
            onOpen();
          }}
        >
          Add Mass Reservation
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="5xl">
          <ModalContent>
            {(onClose) => (
              <form
                action={async (formData) => {
                  if (!validateForm(formData)) return;
                  selectedId === null
                    ? await createMassReservation(formData)
                    : await updateMassReservation(formData);
                  onClose();
                  fetchReservations();
                }}
              >
                <ModalHeader className="flex flex-col gap-1 text-2xl">
                  {selectedId === null ? "Add" : "Edit"} Mass Reservation
                </ModalHeader>
                <ModalBody className="flex-row p-8">
                  <div className="flex w-full flex-col gap-8">
                    {selectedId && <input type="hidden" name="id" value={selectedId} />}
                    <Input
                      autoFocus
                      name="requester_name"
                      isRequired
                      defaultValue={
                        selectedId
                          ? data.find((d) => d.id === selectedId)?.requester_name
                          : undefined
                      }
                      label="Requester's Name"
                      placeholder="Enter Requester's Name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Select
                      autoFocus
                      name="type_of_mass"
                      isRequired
                      defaultSelectedKeys={
                        selectedId
                          ? [data.find((d) => d.id === selectedId)?.type_of_mass]
                          : undefined
                      }
                      label="Type of Mass"
                      placeholder="Select type"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    >
                      {massTypes.map((massType) => (
                        <SelectItem value={massType} key={massType}>
                          {massType}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      autoFocus
                      label="Place of Mass Event"
                      isRequired
                      defaultValue={
                        selectedId
                          ? data.find((d) => d.id === selectedId)?.place_of_mass_event
                          : undefined
                      }
                      name="place_of_mass_event"
                      placeholder="Enter place of mass event"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Contact Number"
                      isRequired
                      defaultValue={
                        selectedId
                          ? data.find((d) => d.id === selectedId)?.contact_number
                          : undefined
                      }
                      name="contact_number"
                      placeholder="Enter contact number"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Select
                      autoFocus
                      label="Mass Presider"
                      isRequired
                      defaultSelectedKeys={
                        selectedId
                          ? [data.find((d) => d.id === selectedId)?.priest_id.toString()]
                          : undefined
                      }
                      name="priest_id"
                      placeholder="Select Mass Presider"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    >
                      {priests.map((priest) => (
                        <SelectItem value={priest.id} key={priest.id.toString()}>
                          {priest.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      type="date"
                      autoFocus
                      name="date_requested"
                      isRequired
                      defaultValue={
                        selectedId
                          ? format(
                              data.find((d) => d.id === selectedId)?.date_requested,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      label="Date Requested"
                      placeholder="Date Requested"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Select
                      autoFocus
                      name="time"
                      isRequired
                      defaultSelectedKeys={
                        selectedId
                          ? [
                              `${format(
                                new Date(
                                  `2021-01-01 ${data.find((d) => d.id === selectedId)
                                    ?.schedule_time_start}`
                                ),
                                "hh:mm a"
                              )} - ${format(
                                new Date(
                                  `2021-01-01 ${data.find((d) => d.id === selectedId)
                                    ?.schedule_time_end}`
                                ),
                                "hh:mm a"
                              )}`,
                            ]
                          : undefined
                      }
                      label="Schedule Time"
                      placeholder="Select time"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    >
                      {massHours.map((range) => (
                        // TODO: proper time ranges
                        <SelectItem value={range} key={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </Select>
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
    <div className="flex h-full justify-center p-8">
      <Table topContent={<Top />}>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.header}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {data.map((row, rowIndex) => (
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
                            await deleteMassReservation(row.id);
                            fetchReservations();
                          }
                        }}
                      >
                        <DropdownItem key="edit">Edit</DropdownItem>
                        <DropdownItem key="delete" color="danger" className="text-danger">
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : column.key === "date_requested" ? (
                    row[column.key]?.toDateString()
                  ) : column.key.startsWith("schedule_time") ? (
                    format(new Date(`2021-01-01 ${row[column.key]}`), "hh:mm a")
                  ) : column.key === "priest_id" ? (
                    priests.find((p) => p.id === row[column.key])?.name
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
