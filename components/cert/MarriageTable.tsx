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
import { createMarriage, deleteMarriage, getMarriages, updateMarriage } from "~/actions/marriage";
import { getPriests } from "~/actions/priests";

export default function MarriageCertTable() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [priests, setPriests] = useState<any>([]);
  const [marriage, setMarriage] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const columns = [
    { header: "Husband Name", key: "husband_name" },
    { header: "Husband Place of Birth", key: "husband_place_of_birth" },
    { header: "Husband Date of Baptism", key: "husband_date_of_baptism" },
    { header: "Husband Place of Baptism", key: "husband_place_of_baptism" },
    { header: "Wife Name", key: "wife_name" },
    { header: "Wife Place of Birth", key: "wife_place_of_birth" },
    { header: "Wife Date of Baptism", key: "wife_date_of_baptism" },
    { header: "Wife Place of Baptism", key: "wife_place_of_baptism" },
    { header: "Date of Marriage", key: "date_of_marriage" },
    { header: "Priest", key: "parish_priest" },
    { header: "Solemnization Date", key: "solemnization_date" },
    { header: "Actions", key: "actions" },
  ];

  async function fetchPriests() {
    const priestData = await getPriests();
    setPriests(priestData);
  }

  async function fetchMarriage() {
    const marriageData = await getMarriages();
    setMarriage(marriageData);
  }

  useEffect(() => {
    fetchPriests();
    fetchMarriage();
  }, []);

  function Top() {
    return (
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Marriage Certificate</h2>
        <Button className="text-xl" size="lg" color="primary" onPress={onOpen}>
          Add Marriage Certificate
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="5xl">
          <ModalContent>
            {(onClose) => (
              <form
                action={async (formData) => {
                  selectedId === null
                    ? await createMarriage(formData)
                    : await updateMarriage(formData);
                  fetchMarriage();
                  onClose();
                }}
              >
                <ModalHeader className="flex flex-col gap-1 text-2xl">
                  {selectedId === null ? "Add" : "Edit"} Marriage Certificate
                </ModalHeader>
                <ModalBody className="flex-row p-8">
                  <div className="flex w-full flex-col gap-8">
                    {selectedId && <input type="hidden" name="id" value={selectedId} />}
                    <Input
                      autoFocus
                      label="Husband Name"
                      placeholder="Enter husband name"
                      name="husband_name"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.husband_name
                          : undefined
                      }
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Husband Actual Address"
                      name="husband_actual_address"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.husband_actual_address
                          : undefined
                      }
                      placeholder="Enter husband address"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Husband Age"
                      name="husband_age"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.husband_age
                          : undefined
                      }
                      placeholder="Enter husband age"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />

                    <Input
                      autoFocus
                      label="Husband Place of Birth"
                      name="husband_place_of_birth"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.husband_place_of_birth
                          : undefined
                      }
                      placeholder="Enter husband place of birth"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Husband Witness"
                      name="husband_witness"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.husband_witness
                          : undefined
                      }
                      placeholder="Enter witness"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Select
                      autoFocus
                      label="Parish Priest"
                      defaultSelectedKeys={
                        selectedId
                          ? [marriage.find((d) => d.id === selectedId)?.parish_priest.toString()]
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
                      label="Husband's Mother Name"
                      name="husband_mother"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.husband_mother
                          : undefined
                      }
                      placeholder="Enter husband's mother name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Husband's Father Name"
                      name="husband_father"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.husband_father
                          : undefined
                      }
                      placeholder="Enter husband's father name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Husband Date of Baptism"
                      name="husband_date_of_baptism"
                      defaultValue={
                        selectedId
                          ? format(
                              marriage.find((d) => d.id === selectedId)?.husband_date_of_baptism,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      placeholder="Enter husband date of baptism"
                      variant="bordered"
                      labelPlacement="outside"
                      type="date"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Husband Place of Baptism"
                      name="husband_place_of_baptism"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.husband_place_of_baptism
                          : undefined
                      }
                      placeholder="Enter husband place of baptism"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Husband Legal Status"
                      name="husband_legal_status"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.husband_legal_status
                          : undefined
                      }
                      placeholder="Enter legal status"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Solemnization Date"
                      name="solemnization_date"
                      defaultValue={
                        selectedId
                          ? format(
                              marriage.find((d) => d.id === selectedId)?.solemnization_date,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      placeholder="Enter solemnization date"
                      variant="bordered"
                      labelPlacement="outside"
                      type="date"
                      size="lg"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Wife Name"
                      placeholder="Enter wife name"
                      name="wife_name"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.wife_name
                          : undefined
                      }
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Wife Actual Address"
                      name="wife_actual_address"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.wife_actual_address
                          : undefined
                      }
                      placeholder="Enter wife address"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Wife Age"
                      name="wife_age"
                      defaultValue={
                        selectedId ? marriage.find((d) => d.id === selectedId)?.wife_age : undefined
                      }
                      placeholder="Enter wife age"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />

                    <Input
                      autoFocus
                      label="Wife Place of Birth"
                      name="wife_place_of_birth"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.wife_place_of_birth
                          : undefined
                      }
                      placeholder="Enter wife place of birth"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Wife Witness"
                      name="wife_witness"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.wife_witness
                          : undefined
                      }
                      placeholder="Enter witness"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Solemnization Place"
                      name="solemnization_place"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.solemnization_place
                          : undefined
                      }
                      placeholder="Enter solemnization place"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Wife's Mother Name"
                      name="wife_mother"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.wife_mother
                          : undefined
                      }
                      placeholder="Enter wife's mother name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Wife's Father Name"
                      name="wife_father"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.wife_father
                          : undefined
                      }
                      placeholder="Enter wife's father name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Wife Date of Baptism"
                      name="wife_date_of_baptism"
                      defaultValue={
                        selectedId
                          ? format(
                              marriage.find((d) => d.id === selectedId)?.wife_date_of_baptism,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      placeholder="Enter wife date of baptism"
                      variant="bordered"
                      labelPlacement="outside"
                      type="date"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Wife Place of Baptism"
                      name="wife_place_of_baptism"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.wife_place_of_baptism
                          : undefined
                      }
                      placeholder="Enter wife place of baptism"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Wife Legal Status"
                      name="wife_legal_status"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.wife_legal_status
                          : undefined
                      }
                      placeholder="Enter legal status"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Date of Marriage"
                      name="date_of_marriage"
                      defaultValue={
                        selectedId
                          ? format(
                              marriage.find((d) => d.id === selectedId)?.date_of_marriage,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      placeholder="Enter date of marriage"
                      variant="bordered"
                      labelPlacement="outside"
                      type="date"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Position"
                      name="position"
                      defaultValue={
                        selectedId ? marriage.find((d) => d.id === selectedId)?.position : undefined
                      }
                      placeholder="Enter position"
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
                          ? marriage.find((d) => d.id === selectedId)?.book_number
                          : undefined
                      }
                      placeholder="Enter book number"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Page Number"
                      name="page_number"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.page_number
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
                      name="entry_number"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.entry_number
                          : undefined
                      }
                      placeholder="Enter entry number"
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
          {marriage.map((row, rowIndex) => (
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
                            await deleteMarriage(row.id);
                            fetchMarriage();
                          }
                        }}
                      >
                        <DropdownItem key="edit">Edit</DropdownItem>
                        <DropdownItem key="delete" color="danger" className="text-danger">
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : column.key === "husband_date_of_baptism" ||
                    column.key === "wife_date_of_baptism" ||
                    column.key === "date_of_marriage" ||
                    column.key === "solemnization_date" ? (
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
