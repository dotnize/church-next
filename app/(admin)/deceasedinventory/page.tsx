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
import { useEffect, useState } from "react";
import { getDeceased } from "~/actions/deceased";

const columns = [
  { key: "id", label: "ID" },
  { key: "deceasedName", label: "Name of Deceased" },
  { key: "residence", label: "Residence" },
  { key: "age", label: "Age" },
  { key: "dateOfDeath", label: "Date of Death" },
  { key: "dateOfBurial", label: "Date of Burial" },
  { key: "placeOfBurial", label: "Place of Burial" },
  { key: "relativeInfo", label: "Relative Information" },
  { key: "actions", label: "Actions" },
];

function TopContent({ search }: { search: (searchTerm: string) => void }) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div className="flex h-full items-center gap-2">
        <Input className="w-96" placeholder="Search..." onChange={(e) => search(e.target.value)} />
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
  const [deceased, setDeceased] = useState<any>([]);
  const [searchvalue, setSearchValue] = useState<string>("");

  async function fetchDeceased() {
    const deceasedData = await getDeceased();

    setDeceased(deceasedData);
  }

  useEffect(() => {
    fetchDeceased();
  }, []);

  const filteredDeceased = deceased.filter((item: any) =>
    item.deceasedName.toLowerCase().includes(searchvalue.toLowerCase())
  );

  return (
    <div className="flex h-full justify-center p-8">
      <Table isStriped topContent={<TopContent search={setSearchValue} />}>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={filteredDeceased}>
          {(item) => (
            <TableRow key={deceased.id}>
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
                  ) : columnKey === "dateOfDeath" || columnKey === "dateOfBurial" ? (
                    item[columnKey]?.toDateString()
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
