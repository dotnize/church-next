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
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { IconCaretDownFilled } from "@tabler/icons-react";

function Top() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-4xl font-bold">Confirmation Certificate</h2>
      <Button className="text-xl" size="lg" color="primary" onPress={onOpen}>
        Add Confirmation Certificate
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">
                Add Confirmation Certificate
              </ModalHeader>
              <ModalBody className="flex-row p-8">
                <div className="flex w-full flex-col gap-8">
                  <Input
                    autoFocus
                    label="Name"
                    placeholder="Enter Name"
                    variant="bordered"
                    labelPlacement="outside"
                    size="lg"
                  />
                  <Input
                    autoFocus
                    label="Mother's Name"
                    placeholder="Enter Mother's Name"
                    variant="bordered"
                    labelPlacement="outside"
                    size="lg"
                  />

                  <Input
                    autoFocus
                    label="Date"
                    placeholder="Enter date"
                    variant="bordered"
                    labelPlacement="outside"
                    type="date"
                    size="lg"
                  />
                  <Input
                    autoFocus
                    label="Sponsor 2"
                    placeholder="Enter sponsor 2"
                    variant="bordered"
                    labelPlacement="outside"
                    size="lg"
                  />
                  <Input
                    autoFocus
                    label="Page number"
                    placeholder="Enter page number"
                    variant="bordered"
                    labelPlacement="outside"
                    size="lg"
                  />
                  <Select
                    autoFocus
                    label="Parish Priest"
                    placeholder="Select parish priest"
                    variant="bordered"
                    labelPlacement="outside"
                    size="lg"
                  >
                    {/* {priests.map((priest, i) => (
                      <SelectItem value={priest} key={i}>
                        {priest}
                      </SelectItem>
                    ))} */}
                  </Select>
                </div>
                <div className="flex w-full flex-col gap-8">
                  <Input
                    autoFocus
                    label="Father's Name"
                    placeholder="Enter Father's Name"
                    variant="bordered"
                    labelPlacement="outside"
                    size="lg"
                  />
                  <Input
                    autoFocus
                    label="Church Name"
                    placeholder="Enter church name"
                    variant="bordered"
                    labelPlacement="outside"
                    size="lg"
                  />
                  <Input
                    autoFocus
                    label="Sponsor 1"
                    placeholder="Enter sponsor 1"
                    variant="bordered"
                    labelPlacement="outside"
                    size="lg"
                  />
                  <Input
                    autoFocus
                    label="Book Number"
                    placeholder="Enter book number"
                    variant="bordered"
                    labelPlacement="outside"
                    size="lg"
                  />
                  <Input
                    autoFocus
                    type="date"
                    label="Date of Issue"
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

export default function ConfirmationCert() {
  interface MassData {
    id: number;
    name: string;
    fathername: string;
    mothername: string;
    churchname: string;
    month: string;
    date: number;
    year: number;
    sponsor1: string;
    sponsor2: string;
    book_number: string;
    page_number: string;
    date_of_issue: string;
    parish_priest: string;
    actions: string[];
  }

  const columns = [
    { header: "Name", key: "name" },
    { header: "Father's Name", key: "fathername" },
    { header: "Mother's Name", key: "mothername" },
    { header: "Church Name", key: "churchname" },
    { header: "Month", key: "month" },
    { header: "Date", key: "date" },
    { header: "Year", key: "year" },
    { header: "Sponsor 1", key: "sponsor1" },
    { header: "Sponsor 2", key: "sponsor2" },
    { header: "Book Number", key: "book_number" },
    { header: "Page Number", key: "page_number" },
    { header: "Date of Issue", key: "date_of_issue" },
    { header: "Parish Priest", key: "parish_priest" },
    { header: "Actions", key: "actions" },
  ];

  const data: MassData[] = [
    {
      id: 1,
      name: "John Doe",
      fathername: "Michael Doe",
      mothername: "Jane Doe",
      churchname: "St. Mary's Church",
      month: "January",
      date: 1,
      year: 2022,
      sponsor1: "Sponsor 1",
      sponsor2: "Sponsor 2",
      book_number: "123",
      page_number: "456",
      date_of_issue: "January 2, 2022",
      parish_priest: "Rev. John Smith",
      actions: ["Edit", "Print", "Delete"],
    },
    {
      id: 2,
      name: "Jane Smith",
      fathername: "David Smith",
      mothername: "Emily Smith",
      churchname: "St. John's Church",
      month: "February",
      date: 1,
      year: 2022,
      sponsor1: "Sponsor 1",
      sponsor2: "Sponsor 2",
      book_number: "789",
      page_number: "012",
      date_of_issue: "February 2, 2022",
      parish_priest: "Rev. Mark Johnson",
      actions: ["Edit", "Print", "Delete"],
    },
  ];

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
