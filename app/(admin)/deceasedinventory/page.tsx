"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

interface DeceasedData {
  id: number;
  name: string;
  resident: string;
  age: number;
  datedeath: string;
  dateburial: string;
  placeburial: string;
  relativeinfo: string;
}

const data: DeceasedData[] = [
  {
    id: 0,
    name: "John Doe",
    resident: "Purok 1",
    age: 69,
    datedeath: "2021-02-01",
    dateburial: "2021-02-03",
    placeburial: "Purok 1",
    relativeinfo: "Jane Doe",
  },
  {
    id: 1,
    name: "Jane Smith",
    resident: "Purok 2",
    age: 55,
    datedeath: "2021-03-15",
    dateburial: "2021-03-18",
    placeburial: "Purok 2",
    relativeinfo: "John Smith",
  },
  {
    id: 2,
    name: "Michael Johnson",
    resident: "Purok 3",
    age: 72,
    datedeath: "2021-04-10",
    dateburial: "2021-04-13",
    placeburial: "Purok 3",
    relativeinfo: "Emily Johnson",
  },
  {
    id: 3,
    name: "Sarah Williams",
    resident: "Purok 4",
    age: 61,
    datedeath: "2021-05-20",
    dateburial: "2021-05-23",
    placeburial: "Purok 4",
    relativeinfo: "David Williams",
  },
  {
    id: 4,
    name: "Robert Brown",
    resident: "Purok 5",
    age: 78,
    datedeath: "2021-06-12",
    dateburial: "2021-06-15",
    placeburial: "Purok 5",
    relativeinfo: "Olivia Brown",
  },
  // 5 more rows
];

const columns = [
  { key: "id", label: "Entry Number" },
  { key: "name", label: "Name of Deceased" },
  { key: "resident", label: "Resident" },
  { key: "age", label: "Age" },
  { key: "datedeath", label: "Date of Death" },
  { key: "dateburial", label: "Date of Burial" },
  { key: "placeburial", label: "Place of Burial" },
  { key: "relativeinfo", label: "Relative Information" },
  { key: "actions", label: "Actions" },
];

function TopContent() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex h-full items-center gap-2">
        <Input className="w-96" placeholder="Search..." />
        <Button size="lg" className="h-14" color="primary">
          Search
        </Button>
      </div>
      <Button size="lg" className="h-14" color="primary">
        Add Entry
      </Button>
    </div>
  );
}

export default function DeceasedInventory() {
  return (
    <div className="mt-24 flex h-full justify-center">
      <Table isStriped topContent={<TopContent />}>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell width="min-content">
                  {columnKey === "actions" ? (
                    <div className="relative flex items-center justify-end gap-2">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button>Actions</Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem>View</DropdownItem>
                          <DropdownItem>Edit</DropdownItem>
                          <DropdownItem>Delete</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
