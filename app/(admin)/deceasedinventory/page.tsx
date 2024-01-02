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
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  useDisclosure,
} from "@nextui-org/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getDeceased } from "~/actions/deceased";
import { getPriests } from "~/actions/priests";

const columns = [
  { key: "id", label: "ID" },
  { key: "lastName", label: "Last name" },
  { key: "firstName", label: "First name" },
  { key: "middleInitial", label: "Middle Initial" },
  { key: "suffix", label: "Suffix" },
  { key: "residence", label: "Residence" },
  { key: "age", label: "Age" },
  { key: "dateOfDeath", label: "Date of Death" },
  { key: "dateOfBurial", label: "Date of Burial" },
  { key: "placeOfBurial", label: "Place of Burial" },
  { key: "relativeInfo", label: "Relative Information" },
  { key: "actions", label: "Actions" },
];

export default function DeceasedInventory() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [deceased, setDeceased] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [priests, setPriests] = useState<any>([]);

  async function fetchPriests() {
    const priestData = await getPriests();
    setPriests(priestData);
  }

  async function fetchDeceased() {
    const deceasedData = await getDeceased();

    setDeceased(deceasedData);
  }

  useEffect(() => {
    fetchDeceased();
    fetchPriests();
  }, []);

  const filteredDeceased = deceased.filter((item: any) =>
    [item.lastName, item.firstName].join(" ").toLowerCase().includes(searchValue.toLowerCase())
  );

  function TopContent() {
    return (
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex h-full items-center gap-2">
          <Input
            className="w-96"
            placeholder="Search by name..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            autoFocus
          />
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="5xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-2xl">
                  View Death Certificate
                </ModalHeader>
                <ModalBody className="flex-row p-8">
                  <div className="flex w-full flex-col gap-8">
                    {selectedId && <input type="hidden" name="id" value={selectedId} />}
                    <Input
                      autoFocus
                      label="Last name"
                      readOnly
                      name="lastName"
                      defaultValue={
                        selectedId ? deceased.find((d) => d.id === selectedId)?.lastName : undefined
                      }
                      placeholder="Enter last name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="First name"
                      readOnly
                      name="firstName"
                      defaultValue={
                        selectedId
                          ? deceased.find((d) => d.id === selectedId)?.firstName
                          : undefined
                      }
                      placeholder="Enter first name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Middle Initial"
                      readOnly
                      name="middleInitial"
                      defaultValue={
                        selectedId
                          ? deceased.find((d) => d.id === selectedId)?.middleInitial
                          : undefined
                      }
                      placeholder="Enter middle initial"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Name suffix"
                      readOnly
                      name="suffix"
                      defaultValue={
                        selectedId ? deceased.find((d) => d.id === selectedId)?.suffix : undefined
                      }
                      placeholder="Enter suffix"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Age"
                      pattern="[0-9]+"
                      readOnly
                      name="age"
                      defaultValue={
                        selectedId ? deceased.find((d) => d.id === selectedId)?.age : undefined
                      }
                      placeholder="Enter age"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />

                    <Input
                      autoFocus
                      label="Date of Burial"
                      readOnly
                      name="dateOfBurial"
                      defaultValue={
                        selectedId
                          ? format(
                              deceased.find((d) => d.id === selectedId)?.dateOfBurial,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      placeholder="Enter date of burial"
                      variant="bordered"
                      labelPlacement="outside"
                      type="date"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Relative Information"
                      readOnly
                      name="relativeInfo"
                      defaultValue={
                        selectedId
                          ? deceased.find((d) => d.id === selectedId)?.relativeInfo
                          : undefined
                      }
                      placeholder="Enter relative information"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Residence"
                      readOnly
                      name="residence"
                      defaultValue={
                        selectedId
                          ? deceased.find((d) => d.id === selectedId)?.residence
                          : undefined
                      }
                      placeholder="Enter residence"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      type="date"
                      readOnly
                      label="Date of Death"
                      name="dateOfDeath"
                      defaultValue={
                        selectedId
                          ? format(
                              deceased.find((d) => d.id === selectedId)?.dateOfDeath,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      placeholder="Enter date of death"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Place of Burial"
                      readOnly
                      name="placeOfBurial"
                      defaultValue={
                        selectedId
                          ? deceased.find((d) => d.id === selectedId)?.placeOfBurial
                          : undefined
                      }
                      placeholder="Enter place of burial"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      readOnly
                      label="Burial Information"
                      name="burialInfo"
                      defaultValue={
                        selectedId
                          ? deceased.find((d) => d.id === selectedId)?.burialInfo
                          : undefined
                      }
                      placeholder="Enter burial information"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Requester Name"
                      readOnly
                      name="requester_name"
                      defaultValue={
                        selectedId
                          ? deceased.find((d) => d.id === selectedId)?.requester_name
                          : undefined
                      }
                      placeholder="Enter requester name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Select
                      autoFocus
                      label="Parish Priest"
                      isRequired
                      disabled
                      defaultSelectedKeys={
                        selectedId
                          ? [deceased.find((d) => d.id === selectedId)?.parish_priest.toString()]
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
                    <Select
                      autoFocus
                      label="Status"
                      disabled
                      defaultSelectedKeys={
                        selectedId
                          ? [deceased.find((d) => d.id === selectedId)?.status.toString()]
                          : undefined
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
                        Invalid
                      </SelectItem>
                      <SelectItem key="For releasing" value="For releasing">
                        For releasing
                      </SelectItem>
                      <SelectItem key="Releasing" value="Releasing">
                        Releasing
                      </SelectItem>
                      <SelectItem key="Released" value="Released">
                        Released
                      </SelectItem>
                    </Select>
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      readOnly
                      label="Volume Number"
                      pattern="[0-9]+"
                      name="volume"
                      defaultValue={
                        selectedId ? deceased.find((d) => d.id === selectedId)?.volume : undefined
                      }
                      placeholder="Enter volume number"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Page Number"
                      pattern="[0-9]+"
                      readOnly
                      name="pageNumber"
                      defaultValue={
                        selectedId
                          ? deceased.find((d) => d.id === selectedId)?.pageNumber
                          : undefined
                      }
                      placeholder="Enter page number"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Entry Number"
                      pattern="[0-9]+"
                      readOnly
                      name="entryNumber"
                      defaultValue={
                        selectedId
                          ? deceased.find((d) => d.id === selectedId)?.entryNumber
                          : undefined
                      }
                      placeholder="Enter entry number"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      type="date"
                      label="Date of Issue"
                      readOnly
                      name="date_of_issue"
                      defaultValue={
                        selectedId && deceased.find((d) => d.id === selectedId)?.date_of_issue
                          ? format(
                              deceased.find((d) => d.id === selectedId)?.date_of_issue,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      placeholder="Enter date of issue"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Submitted Requirements"
                      readOnly
                      name="submitted_requirements"
                      defaultValue={
                        selectedId
                          ? deceased.find((d) => d.id === selectedId)?.submitted_requirements
                          : undefined
                      }
                      placeholder="Enter submitted requirements"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="flat" onPress={onClose}>
                    Close
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
      <Table isStriped topContent={<TopContent />}>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={filteredDeceased}>
          {(item: any) => (
            <TableRow key={deceased.id}>
              {(columnKey) => (
                <TableCell width="min-content">
                  {columnKey === "actions" ? (
                    <div className="relative flex items-center justify-end gap-2">
                      <Button
                        onClick={() => {
                          setSelectedId(item.id);
                          onOpen();
                        }}
                      >
                        View
                      </Button>
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
