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
import { createBaptism, deleteBaptism, getBaptisms, updateBaptism } from "~/actions/baptism";
import { getPriests } from "~/actions/priests";

export default function BaptismCertTable() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [priests, setPriests] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [data, setData] = useState<any>([]);

  const columns = [
    { header: "Child Name", key: "child_name" },
    { header: "Birth Place", key: "birth_place" },
    { header: "Month of Birth", key: "month_of_birth" },
    { header: "Day of Birth", key: "day_of_birth" },
    { header: "Father's Name", key: "fathers_name" },
    { header: "Mother's Name", key: "mothers_name" },
    { header: "Residence", key: "residence" },
    { header: "Day of Baptism", key: "day_of_baptism" },
    { header: "Month of Baptism", key: "month_of_baptism" },
    { header: "Year of Baptism", key: "year_of_baptism" },
    { header: "Parish Priest", key: "parish_priest" },
    { header: "Sponsor 1", key: "sponsor1" },
    { header: "Sponsor 2", key: "sponsor2" },
    { header: "Book Number", key: "book_number" },
    { header: "Page Number", key: "page_number" },
    { header: "Date of Issue", key: "date_of_issue" },
    { header: "Actions", key: "actions" },
  ];

  async function fetchPriests() {
    const priestData = await getPriests();
    setPriests(priestData);
  }

  async function fetchBaptism() {
    const baptismData = await getBaptisms();

    if (Array.isArray(baptismData)) {
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

      const updatedData = baptismData.map((item) => {
        const dateOfBirth = new Date(item.date_of_birth);
        const dateOfBaptism = new Date(item.date_of_baptism);

        return {
          ...item,
          day_of_birth: dateOfBirth.getDate(),
          month_of_birth: monthNames[dateOfBirth.getMonth()],
          day_of_baptism: dateOfBaptism.getDate(),
          month_of_baptism: monthNames[dateOfBaptism.getMonth()],
          year_of_baptism: dateOfBaptism.getFullYear(),
        };
      });

      setData(updatedData);
    }
  }

  useEffect(() => {
    fetchPriests();
    fetchBaptism();
  }, []);

  function Top() {
    return (
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Baptism Certificate</h2>
        <Button
          className="text-xl"
          size="lg"
          color="primary"
          onPress={() => {
            setSelectedId(null);
            onOpen();
          }}
        >
          Add Baptism Certificate
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="5xl">
          <ModalContent>
            {(onClose) => (
              <form
                action={async (formData) => {
                  selectedId === null
                    ? await createBaptism(formData)
                    : await updateBaptism(formData);
                  fetchBaptism();
                  onClose();
                }}
              >
                <ModalHeader className="flex flex-col gap-1 text-2xl">
                  {selectedId === null ? "Add" : "Edit"} Baptism Certificate
                </ModalHeader>
                <ModalBody className="flex-row p-8">
                  <div className="flex w-full flex-col gap-8">
                    {selectedId && <input type="hidden" name="id" value={selectedId} />}
                    <Input
                      autoFocus
                      name="child_name"
                      defaultValue={
                        selectedId
                          ? data.find((d) => d.id === selectedId)?.requester_name
                          : undefined
                      }
                      label="Child Name"
                      placeholder="Enter Child Name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      name="date_of_birth"
                      defaultValue={
                        selectedId
                          ? format(
                              data.find((d) => d.id === selectedId)?.date_of_birth,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      type="date"
                      label="Date of Birth"
                      placeholder="Enter Date of Birth"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />

                    <Input
                      autoFocus
                      label="Residence"
                      name="residence"
                      defaultValue={
                        selectedId ? data.find((d) => d.id === selectedId)?.residence : undefined
                      }
                      placeholder="Enter residence"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Sponsor 1"
                      name="sponsor1"
                      defaultValue={
                        selectedId ? data.find((d) => d.id === selectedId)?.sponsor1 : undefined
                      }
                      placeholder="Enter sponsor 1"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Date of Issue"
                      name="date_of_issue"
                      defaultValue={
                        selectedId
                          ? format(
                              data.find((d) => d.id === selectedId)?.date_of_issue,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      placeholder="Enter date of issue"
                      variant="bordered"
                      labelPlacement="outside"
                      type="date"
                      size="lg"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Birth Place"
                      placeholder="Enter Birth Place"
                      name="birth_place"
                      defaultValue={
                        selectedId ? data.find((d) => d.id === selectedId)?.birth_place : undefined
                      }
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Father's Name"
                      name="fathers_name"
                      defaultValue={
                        selectedId ? data.find((d) => d.id === selectedId)?.fathers_name : undefined
                      }
                      placeholder="Enter Father's Name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      type="date"
                      name="date_of_baptism"
                      defaultValue={
                        selectedId
                          ? format(
                              data.find((d) => d.id === selectedId)?.date_of_baptism,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      label="Date of Baptism"
                      placeholder="Enter date of Baptism"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />

                    <Input
                      autoFocus
                      label="Sponsor 2"
                      name="sponsor2"
                      defaultValue={
                        selectedId ? data.find((d) => d.id === selectedId)?.sponsor2 : undefined
                      }
                      placeholder="Enter sponsor 2"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Mother's Name"
                      name="mothers_name"
                      defaultValue={
                        selectedId ? data.find((d) => d.id === selectedId)?.mothers_name : undefined
                      }
                      placeholder="Enter Mother's Name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Select
                      autoFocus
                      label="Parish Priest"
                      defaultSelectedKeys={
                        selectedId
                          ? [data.find((d) => d.id === selectedId)?.parish_priest.toString()]
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
                    <Input
                      autoFocus
                      name="book_number"
                      defaultValue={
                        selectedId ? data.find((d) => d.id === selectedId)?.book_number : undefined
                      }
                      label="Book Number"
                      placeholder="Enter book number"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Page number"
                      name="page_number"
                      defaultValue={
                        selectedId ? data.find((d) => d.id === selectedId)?.page_number : undefined
                      }
                      placeholder="Enter page number"
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
                            await deleteBaptism(row.id);
                            fetchBaptism();
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
