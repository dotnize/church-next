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
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { IconCaretDownFilled } from "@tabler/icons-react";

export default function MassReservation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  interface MassData {
    id: number;
    name: string;
    contact: string;
    typeOfMass: string;
    massProvider: string;
    place: string;
    date: string;
    scheduleTimeStart: string;
    scheduleTimeEnd: string;
    actions: string[];
  }

  const columns = [
    { header: "Requester's Name", key: "name" },
    { header: "Contact Number", key: "contact" },
    { header: "Type of Mass", key: "typeOfMass" },
    { header: "Mass Provider", key: "massProvider" },
    { header: "Place of Mass Event", key: "place" },
    { header: "Date Requested", key: "date" },
    { header: "Schedule Time Start", key: "scheduleTimeStart" },
    { header: "Schedule Time End", key: "scheduleTimeEnd" },
    { header: "Actions", key: "actions" },
  ];

  const data: MassData[] = [
    {
      id: 1,
      name: "John Doe",
      contact: "1234567890",
      typeOfMass: "Sunday Mass",
      massProvider: "Church A",
      place: "Main Church",
      date: "2022-10-10",
      scheduleTimeStart: "09:00 AM",
      scheduleTimeEnd: "10:00 AM",
      actions: ["Edit", "Delete"],
    },
    {
      id: 2,
      name: "Jane Smith",
      contact: "9876543210",
      typeOfMass: "Daily Mass",
      massProvider: "Church B",
      place: "Chapel",
      date: "2022-10-11",
      scheduleTimeStart: "07:00 AM",
      scheduleTimeEnd: "07:30 AM",
      actions: ["Edit", "Delete"],
    },
    {
      id: 3,
      name: "Mark Johnson",
      contact: "5555555555",
      typeOfMass: "Weekday Mass",
      massProvider: "Church C",
      place: "Outdoor",
      date: "2022-10-12",
      scheduleTimeStart: "06:00 PM",
      scheduleTimeEnd: "07:00 PM",
      actions: ["Edit", "Delete"],
    },
  ];

  function Top() {
    return (
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Mass Reservation</h2>
        <Button className="text-xl" size="lg" color="primary" onPress={onOpen}>
          Add Mass Reservation
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="5xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-2xl">
                  Add Mass Reservation
                </ModalHeader>
                <ModalBody className="flex-row p-8">
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Requester's Name"
                      placeholder="Enter Requester's Name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <div>
                      <h2>Type of Mass</h2>
                      <RadioGroup size="lg" label="Please select one" orientation="horizontal">
                        <Radio value="buenos-aires">Thanksgiving Mass</Radio>
                        <Radio value="sydney">Barangay Mass</Radio>
                        <Radio value="san-francisco">School Mass</Radio>
                        <Radio value="london">Fiesta Mass</Radio>
                      </RadioGroup>
                    </div>
                    <Input
                      autoFocus
                      label="Place of Mass Event"
                      placeholder="Enter place of mass event"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Schedule Time Start"
                      placeholder="time start"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Contact Number"
                      placeholder="Enter contact number"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Mass Presider"
                      placeholder="Enter Requester's Name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <div className="mt-[46px] flex w-full flex-col gap-8">
                      <Input
                        autoFocus
                        label="Date Requested"
                        placeholder="Date of requested"
                        variant="bordered"
                        labelPlacement="outside"
                        size="lg"
                      />
                      <Input
                        autoFocus
                        label="Schedule Time End"
                        placeholder="Time end"
                        variant="bordered"
                        labelPlacement="outside"
                        size="lg"
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Save
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
                      <DropdownMenu aria-label="Dynamic Actions">
                        {row.actions.map((action, index) => (
                          <DropdownItem
                            key={index}
                            color={action === "Delete" ? "danger" : "default"}
                            className={action === "Delete" ? "text-danger" : ""}
                          >
                            {action}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    row[column.key as keyof typeof row]
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
