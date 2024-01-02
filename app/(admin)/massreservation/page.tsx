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
  type Selection,
} from "@nextui-org/react";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { differenceInHours, format, isSameDay } from "date-fns";
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
  const schedDisclosure = useDisclosure();

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
    { header: "Date Scheduled", key: "date_scheduled" },
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

  const [selectedTime, setSelectedTime] = useState<Selection>(
    new Set(
      selectedId
        ? [
            `${format(
              new Date(`2021-01-01 ${data.find((d) => d.id === selectedId)?.schedule_time_start}`),
              "hh:mm a"
            )} - ${format(
              new Date(`2021-01-01 ${data.find((d) => d.id === selectedId)?.schedule_time_end}`),
              "hh:mm a"
            )}`,
          ]
        : undefined
    )
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    selectedId
      ? format(data.find((d) => d.id === selectedId)?.date_scheduled, "yyyy-MM-dd")
      : undefined
  );
  const [selectedPriest, setSelectedPriest] = useState<Selection>(
    new Set(selectedId ? [data.find((d) => d.id === selectedId)?.priest_id.toString()] : undefined)
  );

  useEffect(() => {
    if (selectedId === null) {
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setSelectedPriest(undefined);
      return;
    }
    setSelectedTime(
      new Set([
        `${format(
          new Date(`2021-01-01 ${data.find((d) => d.id === selectedId)?.schedule_time_start}`),
          "hh:mm a"
        )} - ${format(
          new Date(`2021-01-01 ${data.find((d) => d.id === selectedId)?.schedule_time_end}`),
          "hh:mm a"
        )}`,
      ])
    );
    setSelectedDate(format(data.find((d) => d.id === selectedId)?.date_scheduled, "yyyy-MM-dd"));
    setSelectedPriest(new Set([data.find((d) => d.id === selectedId)?.priest_id.toString()]));
  }, [selectedId, data]);

  function validateSchedule() {
    if (
      !selectedPriest ||
      !selectedDate ||
      !selectedTime ||
      !Array.from(selectedPriest).length ||
      !Array.from(selectedTime).length
    )
      return false;

    const priestId = parseInt(Array.from(selectedPriest)[0] as string);
    const priestReservationsThisDay = data.filter(
      (d) =>
        isSameDay(new Date(d.date_scheduled), new Date(selectedDate)) && d.priest_id === priestId
    );

    const selectedTimeStart = format(
      new Date(`2021-01-01 ${(Array.from(selectedTime)[0] as string).split(" - ")[0]}`),
      "HH:mm:ss"
    );

    const requestedDate = new Date(selectedDate + " " + selectedTimeStart);
    const today = new Date();
    const minHrs =
      (process.env.NEXT_PUBLIC_MIN_HOURS_RESERVATION as unknown as number) ||
      minHoursBeforeReservation;
    if (differenceInHours(requestedDate, today) < minHrs) {
      alert(`Reservation must be at least ${minHrs} hours from now.`);
      return false;
    }

    const priestHasConflict = priestReservationsThisDay.some(
      (r) => selectedTimeStart === r.schedule_time_start && r.id !== selectedId
    );

    if (priestHasConflict) {
      alert("Selected mass presider is not available during the selected time.");
    }

    return !priestHasConflict;
  }

  const [filteredPriests, setFilteredPriests] = useState<any>(priests);
  useEffect(() => {
    setFilteredPriests(() => filterPriests());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedTime]);

  function filterPriests() {
    if (!selectedDate || !selectedTime || !Array.from(selectedTime).length) {
      return priests;
    }
    return priests.map((p) => {
      const priestReservationsThisDay = data.filter(
        (d) => isSameDay(new Date(d.date_scheduled), new Date(selectedDate)) && d.priest_id === p.id
      );

      const selectedTimeStart = format(
        new Date(`2021-01-01 ${(Array.from(selectedTime)[0] as string).split(" - ")[0]}`),
        "HH:mm:ss"
      );

      const priestHasConflict = priestReservationsThisDay.some(
        (r) => selectedTimeStart === r.schedule_time_start && r.id !== selectedId
      );

      if (priestHasConflict && selectedPriest && Array.from(selectedPriest).length) {
        const priestId = parseInt(Array.from(selectedPriest)[0] as string);
        if (p.id === priestId) {
          setSelectedPriest(undefined);
        }
      }

      return {
        ...p,
        notAvailable: priestHasConflict,
      };
    });
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
            schedDisclosure.onOpen();
          }}
        >
          Add Mass Reservation
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="5xl">
          <ModalContent>
            {(onClose) => (
              <form
                action={async (formData) => {
                  selectedId === null
                    ? await createMassReservation(formData)
                    : await updateMassReservation(formData);
                  onClose();
                  fetchReservations();
                  setSelectedDate(undefined);
                  setSelectedTime(undefined);
                  setSelectedPriest(undefined);
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
                      type="date"
                      autoFocus
                      name="date_scheduled"
                      value={selectedDate}
                      isReadOnly
                      className="pointer-events-none"
                      label="Date Scheduled"
                      placeholder="Date Scheduled"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />

                    <Select
                      autoFocus
                      label="Mass Presider"
                      selectedKeys={selectedPriest}
                      className="pointer-events-none"
                      name="priest_id"
                      placeholder="Select Mass Presider"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    >
                      {filteredPriests.map((priest) => (
                        <SelectItem value={priest.id} key={priest.id.toString()}>
                          {`${priest.name}${priest.notAvailable ? " (Not Available)" : ""}`}
                        </SelectItem>
                      ))}
                    </Select>
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

                    <Select
                      autoFocus
                      label="Status"
                      defaultSelectedKeys={
                        selectedId
                          ? [data.find((d) => d.id === selectedId)?.status.toString()]
                          : ["Pending"]
                      }
                      name="status"
                      placeholder="Select status"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    >
                      <SelectItem key="Pending" value="Pending">
                        Pending
                      </SelectItem>
                      <SelectItem key="Invalid" value="Invalid">
                        Approved
                      </SelectItem>
                      <SelectItem key="For releasing" value="For releasing">
                        Not approved
                      </SelectItem>
                    </Select>
                    <Select
                      autoFocus
                      name="time"
                      selectedKeys={selectedTime}
                      className="pointer-events-none"
                      label="Schedule Time"
                      placeholder="Select time"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    >
                      {massHours.map((range) => (
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
        <Modal
          isOpen={schedDisclosure.isOpen}
          onOpenChange={schedDisclosure.onOpenChange}
          placement="top-center"
          size="5xl"
          backdrop="transparent"
          motionProps={{ variants: {} }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-2xl">Select schedule</ModalHeader>
                <ModalBody className="flex-row p-8">
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      type="date"
                      autoFocus
                      name="date_scheduled"
                      isRequired
                      onValueChange={setSelectedDate}
                      value={selectedDate}
                      label="Date Scheduled"
                      placeholder="Date Scheduled"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      type="date"
                      autoFocus
                      name="date_requested"
                      isRequired
                      isReadOnly
                      value={format(
                        selectedId
                          ? data.find((d) => d.id === selectedId)?.date_requested
                          : new Date(),
                        "yyyy-MM-dd"
                      )}
                      label="Date Requested"
                      placeholder="Date Requested"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Select
                      autoFocus
                      name="time"
                      isRequired
                      onSelectionChange={setSelectedTime}
                      selectedKeys={selectedTime}
                      label="Schedule Time"
                      placeholder="Select time"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    >
                      {massHours.map((range) => (
                        <SelectItem value={range} key={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      autoFocus
                      label="Mass Presider"
                      isRequired
                      onSelectionChange={setSelectedPriest}
                      selectedKeys={selectedPriest}
                      disabledKeys={filteredPriests.map((p) => p.notAvailable && p.id.toString())}
                      name="priest_id"
                      placeholder="Select Mass Presider"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    >
                      {filteredPriests.map((priest) => (
                        <SelectItem value={priest.id} key={priest.id.toString()}>
                          {`${priest.name}${priest.notAvailable ? " (Not Available)" : ""}`}
                        </SelectItem>
                      ))}
                    </Select>
                    {selectedId && (
                      <Input
                        type="date"
                        autoFocus
                        name="date_requested"
                        value={
                          selectedId
                            ? format(
                                data.find((d) => d.id === selectedId)?.date_requested,
                                "yyyy-MM-dd"
                              )
                            : undefined
                        }
                        isReadOnly
                        className="pointer-events-none"
                        label="Date Requested"
                        placeholder="Date Requested"
                        variant="bordered"
                        labelPlacement="outside"
                        size="lg"
                      />
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      if (!validateSchedule()) return;
                      onClose();
                      onOpen();
                    }}
                  >
                    Next
                  </Button>
                </ModalFooter>
              </>
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
                            schedDisclosure.onOpen();
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
                  ) : column.key === "date_scheduled" ? (
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
