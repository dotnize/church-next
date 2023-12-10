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
import blobStream from "blob-stream";
import { format } from "date-fns";
import PDFDocument from "pdfkit/js/pdfkit.standalone";
import { useEffect, useState } from "react";

import { createBaptism, deleteBaptism, getBaptisms, updateBaptism } from "~/actions/baptism";
import { getPriests } from "~/actions/priests";
import { getOrdinal } from "~/lib/utils";

export default function BaptismCertTable() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isViewMode, setIsViewMode] = useState(false);
  const [priests, setPriests] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [data, setData] = useState<any>([]);

  const columns = [
    { header: "Child Name", key: "child_name" },
    { header: "Birth Place", key: "birth_place" },
    { header: "Date of Birth", key: "date_of_birth" },
    { header: "Father's Name", key: "fathers_name" },
    { header: "Mother's Name", key: "mothers_name" },
    { header: "Residence", key: "residence" },
    { header: "Date of Baptism", key: "date_of_baptism" },
    { header: "Parish Priest", key: "parish_priest" },
    { header: "Date of Issue", key: "date_of_issue" },
    { header: "Status", key: "status" },
    { header: "Actions", key: "actions" },
  ];

  async function fetchPriests() {
    const priestData = await getPriests();
    setPriests(priestData);
  }

  async function fetchBaptism() {
    const baptismData = await getBaptisms();
    setData(baptismData);
  }

  useEffect(() => {
    fetchPriests();
    fetchBaptism();
  }, []);

  async function printData(selectedData: any) {
    const doc = new PDFDocument({ size: "A2" });
    const stream = doc.pipe(blobStream());

    const res = await fetch("/certificates/baptism.jpg");
    const image = Buffer.from(await res.arrayBuffer());
    doc.image(image, 0, 0, { width: 1190, height: 1684 });
    doc.font("Courier");

    const child_name = selectedData.child_name;
    const birth_place = selectedData.birth_place;
    const day_of_birth = getOrdinal(format(selectedData.date_of_birth, "dd"));
    const month_of_birth = format(selectedData.date_of_birth, "MMMM");
    const fathers_name = selectedData.fathers_name;
    const mothers_name = selectedData.mothers_name;
    const residence = selectedData.residence;
    const day_of_baptism = getOrdinal(format(selectedData.date_of_baptism, "dd"));
    const month_of_baptism = format(selectedData.date_of_baptism, "MMMM");
    const year_of_baptism = format(selectedData.date_of_baptism, "yyyy");
    const parish_priest = selectedData.parish_priest.split("Rev. Fr. ")[1];
    const sponsor1 = selectedData.sponsor1;
    const sponsor2 = selectedData.sponsor2;
    const book_number = selectedData.book_number;
    const page_number = selectedData.page_number;
    const date_of_issue = format(selectedData.date_of_issue, "yyyy-MM-dd");

    // TODO: reduce font sizes for long texts

    doc
      .fontSize(28)
      .text(child_name, 588, 714, { width: 460, align: "center", characterSpacing: -1 });
    doc
      .fontSize(birth_place.length > 20 ? 20 : 28)
      .text(birth_place, 278, 774, { width: 286, align: "center", characterSpacing: -1 });
    doc
      .fontSize(28)
      .text(day_of_birth, 678, 774, { width: 168, align: "center", characterSpacing: -1 });
    doc
      .fontSize(24)
      .text(month_of_birth, 958, 776, { width: 128, align: "left", characterSpacing: -1 });
    doc
      .fontSize(28)
      .text(fathers_name, 288, 828, { width: 280, align: "center", characterSpacing: -1 });
    doc
      .fontSize(28)
      .text(mothers_name, 648, 828, { width: 400, align: "center", characterSpacing: -1 });
    doc
      .fontSize(residence.length > 20 ? 24 : 28)
      .text(residence, 346, 882, { width: 430, align: "center", characterSpacing: -1 });
    doc
      .fontSize(28)
      .text(day_of_baptism, 368, 926, { width: 158, align: "center", characterSpacing: -1 });
    doc
      .fontSize(26)
      .text(month_of_baptism, 648, 926, { width: 132, align: "center", characterSpacing: -1 });
    doc
      .fontSize(28)
      .text(year_of_baptism, 828, 926, { width: 164, align: "center", characterSpacing: -1 });
    doc
      .fontSize(28)
      .text(parish_priest, 348, 1090, { width: 706, align: "left", characterSpacing: -1 });
    doc.fontSize(28).text(sponsor1, 498, 1142, { width: 564, align: "left", characterSpacing: -1 });
    sponsor2 &&
      doc
        .fontSize(28)
        .text("& " + sponsor2, 186, 1194, { width: 880, align: "left", characterSpacing: -1 });
    doc
      .fontSize(28)
      .text(book_number, 324, 1296, { width: 104, align: "center", characterSpacing: -1 });
    doc
      .fontSize(28)
      .text(page_number, 606, 1296, { width: 140, align: "center", characterSpacing: -1 });
    doc
      .fontSize(28)
      .text(date_of_issue, 184, 1424, { width: 220, align: "center", characterSpacing: -1 });
    doc.fontSize(20).text(selectedData.parish_priest, 720, 1428, {
      width: 330,
      align: "center",
      characterSpacing: -1,
    });

    doc.end();
    stream.on("finish", function () {
      //const blob = stream.toBlob("application/pdf");
      // or get a blob URL for display in the browser
      const url = stream.toBlobURL("application/pdf");
      window.open(url);
    });
  }

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
            setIsViewMode(false);
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
                  {isViewMode ? "View" : selectedId === null ? "Add" : "Edit"} Baptism Certificate
                </ModalHeader>
                <ModalBody className="flex-row p-8">
                  <div className="flex w-full flex-col gap-8">
                    {selectedId && <input type="hidden" name="id" value={selectedId} />}
                    <Input
                      autoFocus
                      isRequired={!isViewMode}
                      name="child_name"
                      readOnly={isViewMode}
                      defaultValue={
                        selectedId ? data.find((d) => d.id === selectedId)?.child_name : undefined
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="date_of_issue"
                      defaultValue={
                        selectedId && data.find((d) => d.id === selectedId)?.date_of_issue
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
                    <Select
                      autoFocus
                      label="Status"
                      disabled={isViewMode}
                      isRequired={!isViewMode}
                      defaultSelectedKeys={
                        selectedId
                          ? [data.find((d) => d.id === selectedId)?.status.toString()]
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
                      <SelectItem key="Released" value="Released">
                        Released
                      </SelectItem>
                    </Select>
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Birth Place"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="sponsor2"
                      defaultValue={
                        selectedId ? data.find((d) => d.id === selectedId)?.sponsor2 : undefined
                      }
                      placeholder="Enter sponsor 2"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Requester Name"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="requester_name"
                      defaultValue={
                        selectedId
                          ? data.find((d) => d.id === selectedId)?.requester_name
                          : undefined
                      }
                      placeholder="Enter requester name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      isRequired={!isViewMode}
                      label="Mother's Name"
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      disabled={isViewMode}
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
                      pattern="[0-9]+"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      pattern="[0-9]+"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="page_number"
                      defaultValue={
                        selectedId ? data.find((d) => d.id === selectedId)?.page_number : undefined
                      }
                      placeholder="Enter page number"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Submitted Requirements"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="submitted_requirements"
                      defaultValue={
                        selectedId
                          ? data.find((d) => d.id === selectedId)?.submitted_requirements
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
                            setIsViewMode(false);
                            onOpen();
                          } else if (key === "delete") {
                            await deleteBaptism(row.id);
                            fetchBaptism();
                          } else if (key === "print") {
                            printData(row);
                          } else if (key === "view") {
                            setSelectedId(row.id);
                            setIsViewMode(true);
                            onOpen();
                          }
                        }}
                      >
                        <DropdownItem key="edit">Edit</DropdownItem>
                        <DropdownItem key="view">View</DropdownItem>
                        <DropdownItem key="print">Generate Certificate</DropdownItem>
                        <DropdownItem key="delete" color="danger" className="text-danger">
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : column.key.startsWith("date") ? (
                    format(row[column.key], "yyyy-MM-dd")
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
