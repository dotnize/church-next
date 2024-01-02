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

import {
  createConfirmation,
  deleteConfirmation,
  getConfirmations,
  updateConfirmation,
} from "~/actions/confirmation";
import { getPriests } from "~/actions/priests";
import { getOrdinal } from "~/lib/utils";

export default function ConfirmationCert() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // TODO: move to main/default component
  const [priests, setPriests] = useState<any>([]);
  const [confirmations, setConfirmations] = useState<any>([]);
  // for modal
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const columns = [
    { header: "Name", key: "name" },
    { header: "Father's Name", key: "father_name" },
    { header: "Mother's Name", key: "mother_name" },
    { header: "Church Name", key: "church_name" },
    { header: "Month", key: "month" },
    { header: "Date", key: "day" },
    { header: "Year", key: "year" },
    { header: "Sponsor 1", key: "sponsor1" },
    { header: "Sponsor 2", key: "sponsor2" },
    { header: "Parish Priest", key: "parish_priest" },
    { header: "Status", key: "status" },
    { header: "Actions", key: "actions" },
  ];

  async function fetchPriests() {
    const priestData = await getPriests();
    setPriests(priestData);
  }

  async function fetchConfirmations() {
    const confirmationData = await getConfirmations();

    if (Array.isArray(confirmationData)) {
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

      const updatedData = confirmationData.map((item) => {
        const date = new Date(item.date);

        return {
          ...item,
          day: date.getDate(),
          month: monthNames[date.getMonth()],
          year: date.getFullYear(),
        };
      });

      setConfirmations(updatedData);
    }
  }

  useEffect(() => {
    fetchPriests();
    fetchConfirmations();
  }, []);

  async function printData(selectedData: any) {
    if (
      !selectedData ||
      !selectedData.name ||
      !selectedData.father_name ||
      !selectedData.mother_name ||
      !selectedData.date ||
      !selectedData.sponsor1 ||
      !selectedData.sponsor2 ||
      !selectedData.book_number ||
      !selectedData.page_number ||
      !selectedData.date_of_issue ||
      !selectedData.parish_priest ||
      !selectedData.receiptNo
    ) {
      alert("Cannot generate certificate. Please complete the required fields.");
      return;
    }

    if (selectedData.receiptNo !== prompt("Please enter the receipt number for verification")) {
      alert("Invalid receipt number.");
      return;
    }

    const doc = new PDFDocument({ size: "A2", layout: "landscape" });
    const stream = doc.pipe(blobStream());

    const res = await fetch("/certificates/confirmation.jpg");
    const image = Buffer.from(await res.arrayBuffer());
    doc.image(image, 0, 0, { width: 1684, height: 1190 });
    doc.font("Courier");

    const name = selectedData.name;
    const father_name = selectedData.father_name;
    const mother_name = selectedData.mother_name;
    const day = getOrdinal(format(selectedData.date, "dd"));
    const month = format(selectedData.date, "MMMM");
    const year = format(selectedData.date, "yyyy");
    const sponsor1 = selectedData.sponsor1;
    const sponsor2 = selectedData.sponsor2;
    const book_number = selectedData.book_number;
    const page_number = selectedData.page_number;
    const date_of_issue = format(selectedData.date_of_issue, "yyyy-MM-dd");
    const parish_priest = selectedData.parish_priest;

    // TODO: reduce font sizes for long texts

    doc.fontSize(30).text(name, 590, 578, { width: 910, align: "left", characterSpacing: -1 });
    doc
      .fontSize(28)
      .text(father_name, 400, 636, { width: 460, align: "center", characterSpacing: -1 });
    doc
      .fontSize(28)
      .text(mother_name, 948, 636, { width: 560, align: "center", characterSpacing: -1 });
    doc.fontSize(26).text(day, 1178, 690, { width: 64, align: "center", characterSpacing: -1 });
    doc.fontSize(26).text(month, 1346, 690, { width: 164, align: "center", characterSpacing: -1 });
    doc.fontSize(30).text(year, 166, 746, { width: 134, align: "center", characterSpacing: -1 });
    doc
      .fontSize(26)
      .text(parish_priest, 358, 746, { width: 440, align: "left", characterSpacing: -1 });

    doc
      .fontSize(28)
      .text(sponsor1, 532, 804, { width: 428, align: "center", characterSpacing: -1 });
    doc
      .fontSize(28)
      .text(sponsor2, 1042, 804, { width: 470, align: "center", characterSpacing: -1 });

    doc.fontSize(28).text(book_number, 906, 860, { width: 76, align: "center" });
    doc.fontSize(28).text(page_number, 1132, 860, { width: 76, align: "center" });
    doc.fontSize(30).text(date_of_issue, 218, 984, { width: 374, align: "center" });
    doc
      .fontSize(26)
      .text(parish_priest, 986, 984, { width: 464, align: "center", characterSpacing: -1 });

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
        <Input
          className="w-96"
          placeholder="Search by Transaction ID..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          autoFocus
        />
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
          Add Confirmation Certificate
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="5xl">
          <ModalContent>
            {(onClose) => (
              <form
                action={async (formData) => {
                  selectedId === null
                    ? await createConfirmation(formData)
                    : await updateConfirmation(formData);
                  fetchConfirmations();
                  onClose();
                }}
              >
                <ModalHeader className="flex flex-col gap-1 text-2xl">
                  {isViewMode ? "View" : selectedId === null ? "Add" : "Edit"} Confirmation
                  Certificate
                </ModalHeader>
                <ModalBody className="flex-row p-8">
                  <div className="flex w-full flex-col gap-8">
                    {selectedId && <input type="hidden" name="id" value={selectedId} />}
                    <Input
                      autoFocus
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      label="Name"
                      placeholder="Enter Name"
                      name="name"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.name
                          : undefined
                      }
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Mother's Name"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="mother_name"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.mother_name
                          : undefined
                      }
                      placeholder="Enter Mother's Name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />

                    <Input
                      autoFocus
                      label="Date"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="date"
                      defaultValue={
                        selectedId
                          ? format(
                              confirmations.find((d) => d.id === selectedId)?.date,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      placeholder="Enter date"
                      variant="bordered"
                      labelPlacement="outside"
                      type="date"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Sponsor 2"
                      name="sponsor2"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.sponsor2
                          : undefined
                      }
                      placeholder="Enter sponsor 2"
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
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.page_number
                          : undefined
                      }
                      placeholder="Enter page number"
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
                          ? [
                              confirmations
                                .find((d) => d.id === selectedId)
                                ?.parish_priest.toString(),
                            ]
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
                    {selectedId && (
                      <Input
                        autoFocus
                        label="Date Requested"
                        isRequired={!isViewMode}
                        readOnly={isViewMode}
                        name="date_requested"
                        defaultValue={
                          selectedId &&
                          confirmations.find((d) => d.id === selectedId)?.date_requested
                            ? format(
                                confirmations.find((d) => d.id === selectedId)?.date_requested,
                                "yyyy-MM-dd"
                              )
                            : undefined
                        }
                        placeholder="Enter date requested"
                        variant="bordered"
                        labelPlacement="outside"
                        type="date"
                        size="lg"
                      />
                    )}
                    <Input
                      autoFocus
                      label="Receipt No."
                      readOnly={isViewMode}
                      name="receiptNo"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.receiptNo
                          : undefined
                      }
                      placeholder="Enter receipt number"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    {selectedId && (
                      <Input
                        autoFocus
                        label="Transaction ID"
                        readOnly
                        required
                        name="transactionId"
                        defaultValue={
                          selectedId
                            ? confirmations.find((d) => d.id === selectedId)?.transactionId
                            : undefined
                        }
                        placeholder="Transaction ID"
                        variant="bordered"
                        labelPlacement="outside"
                        size="lg"
                      />
                    )}
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      label="Father's Name"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="father_name"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.father_name
                          : undefined
                      }
                      placeholder="Enter Father's Name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Church Name"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="church_name"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.church_name
                          : undefined
                      }
                      placeholder="Enter church name"
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
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.sponsor1
                          : undefined
                      }
                      placeholder="Enter sponsor 1"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="Book Number"
                      pattern="[0-9]+"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="book_number"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.book_number
                          : undefined
                      }
                      placeholder="Enter book number"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      type="date"
                      label="Date of Issue"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="date_of_issue"
                      defaultValue={
                        selectedId && confirmations.find((d) => d.id === selectedId)?.date_of_issue
                          ? format(
                              confirmations.find((d) => d.id === selectedId)?.date_of_issue,
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
                      label="Requester Name"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="requester_name"
                      defaultValue={
                        selectedId
                          ? confirmations.find((d) => d.id === selectedId)?.requester_name
                          : undefined
                      }
                      placeholder="Enter requester name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Select
                      autoFocus
                      label="Status"
                      disabled={isViewMode}
                      isRequired={!isViewMode}
                      defaultSelectedKeys={
                        selectedId
                          ? [confirmations.find((d) => d.id === selectedId)?.status.toString()]
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

                    {selectedId &&
                      confirmations.find((d) => d.id === selectedId)?.submitted_requirements && (
                        <div className="flex flex-col gap-2">
                          <div>Uploaded requirements:</div>
                          <div className="flex h-24 flex-wrap gap-2 overflow-y-scroll">
                            {JSON.parse(
                              confirmations.find((d) => d.id === selectedId)?.submitted_requirements
                            ).map((file, i) => (
                              <div className="relative" key={i}>
                                <div className="absolute flex h-full w-full flex-col items-center justify-center gap-2 bg-black bg-opacity-20 opacity-0 transition hover:opacity-100">
                                  <a
                                    href={file}
                                    target="_blank"
                                    className="rounded-md bg-white px-2 py-1 text-xs"
                                  >
                                    View
                                  </a>
                                </div>
                                <img
                                  alt="uploaded file"
                                  src={file}
                                  width="72"
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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
          {confirmations
            .filter((d) =>
              searchValue ? d.transactionId.toLowerCase().includes(searchValue.toLowerCase()) : true
            )
            .map((row, rowIndex) => (
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
                              await deleteConfirmation(row.id);
                              fetchConfirmations();
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
