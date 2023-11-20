"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { IconCaretDown } from "@tabler/icons-react";

export default function MassReservation() {
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
        <Button className="text-xl" size="lg" color="primary">
          Add Mass Reservation
        </Button>
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
                        <Button endContent={<IconCaretDown />} variant="bordered">
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
