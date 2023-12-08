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
import { createDeceased, deleteDeceased, getDeceased, updateDeceased } from "~/actions/deceased";
import { getPriests } from "~/actions/priests";

export default function DeathCertTable() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // TODO: move to main/default component
  const [priests, setPriests] = useState<any>([]);
  const [deceased, setDeceased] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const columns = [
    { header: "Name of Deceased", key: "deceasedName" },
    { header: "Residence", key: "residence" },
    { header: "Age", key: "age" },
    { header: "Date of Death", key: "dateOfDeath" },
    { header: "Date of Burial", key: "dateOfBurial" },
    { header: "Place of Burial", key: "placeOfBurial" },
    { header: "Relative Information", key: "relativeInfo" },
    { header: "Actions", key: "actions" },
  ];
  async function fetchPriests() {
    const priestData = await getPriests();
    setPriests(priestData);
  }

  async function fetchDeceased() {
    const deceasedData = await getDeceased();

    setDeceased(deceasedData);
  }

  useEffect(() => {
    fetchPriests();
    fetchDeceased();
  }, []);

  function Top() {
    return (
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Death Certificate</h2>
        <Button className="text-xl" size="lg" color="primary" onPress={onOpen}>
          Add Death Certificate
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="5xl">
          <ModalContent>
            {(onClose) => (
              <form
                action={async (formData) => {
                  selectedId === null
                    ? await createDeceased(formData)
                    : await updateDeceased(formData);
                  fetchDeceased();
                  onClose();
                }}
              >
                <ModalHeader className="flex flex-col gap-1 text-2xl">
                  {selectedId === null ? "Add" : "Edit"} Death Certificate
                </ModalHeader>
                <ModalBody className="flex-row p-8">
                  <div className="flex w-full flex-col gap-8">
                    {selectedId && <input type="hidden" name="id" value={selectedId} />}
                    <Input
                      autoFocus
                      label="Name of Deceased"
                      name="deceasedName"
                      defaultValue={
                        selectedId
                          ? deceased.find((d) => d.id === selectedId)?.deceasedName
                          : undefined
                      }
                      placeholder="Enter name of deceased"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Age"
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
                    <Select
                      autoFocus
                      label="Parish Priest"
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
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Residence"
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
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Volume Number"
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
                      name="date_of_issue"
                      defaultValue={
                        selectedId
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
          {deceased.map((row, rowIndex) => (
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
                            await deleteDeceased(row.id);
                            fetchDeceased();
                          }
                        }}
                      >
                        <DropdownItem key="edit">Edit</DropdownItem>
                        <DropdownItem key="delete" color="danger" className="text-danger">
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : column.key === "dateOfBurial" ||
                    column.key === "dateOfDeath" ||
                    column.key === "date_of_issue" ? (
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
