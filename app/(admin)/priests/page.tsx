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
import { compareAsc, format, isSameDay } from "date-fns";
import PDFDocument from "pdfkit/js/pdfkit.standalone";
import { useEffect, useState } from "react";

import { getMassReservations } from "~/actions/massreservation";
import { createPriest, deletePriest, getPriests, updatePriest } from "~/actions/priests";

export default function Priests() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [priests, setPriests] = useState<any>([]);
  const [reservations, setReservations] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isViewMode, setIsViewMode] = useState<boolean>(false);

  const columns = [
    { header: "ID", key: "id" },
    { header: "Parish Priest Name", key: "name" },
    { header: "Schedule", key: "schedule" },
    { header: "Actions", key: "actions" },
  ];

  async function fetchPriests() {
    const priestData = await getPriests();
    setPriests(priestData);
  }
  async function fetchReservations() {
    const reservationData = await getMassReservations();
    setReservations(reservationData);
  }

  function getSchedule(index: number) {
    const priest = priests[index];
    const currentReservations = reservations.filter(
      (r) =>
        r.priest_id === priest.id &&
        (isSameDay(r.date_scheduled, new Date()) || compareAsc(r.date_scheduled, new Date()) >= 0)
    );
    if (!currentReservations || !currentReservations.length) {
      alert("Selected priest has no upcoming mass reservations.");
      return;
    }

    const doc = new PDFDocument();
    const stream = doc.pipe(blobStream());

    doc.fontSize(25).text("Saint Michael Parish Church", 164, 80);

    doc.fontSize(14).text("Upcoming Mass Reservations schedule for", 100, 130);
    doc.fontSize(16).text(priest.name, 100, 148);

    const reservationsText = currentReservations.map(
      (r) =>
        `${format(r.date_scheduled, "yyyy-MM-dd")} ${format(
          new Date(`2021-01-01 ${r.schedule_time_start}`),
          "hh:mm a"
        )}-${format(new Date(`2021-01-01 ${r.schedule_time_end}`), "hh:mm a")} - ${
          r.type_of_mass
        } - ${r.place_of_mass_event}`
    );

    doc.list(reservationsText, 100, 196);

    doc.end();
    stream.on("finish", function () {
      //const blob = stream.toBlob("application/pdf");
      // or get a blob URL for display in the browser
      const url = stream.toBlobURL("application/pdf");
      window.open(url);
    });
  }

  useEffect(() => {
    fetchPriests();
    fetchReservations();
  }, []);
  function Top() {
    return (
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Parish Priests Details</h2>
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
          Add Parish Priest Details
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="5xl">
          <ModalContent>
            {(onClose) => (
              <form
                action={async (formData) => {
                  selectedId === null ? await createPriest(formData) : await updatePriest(formData);
                  fetchPriests();
                  onClose();
                }}
              >
                <ModalHeader className="flex flex-col gap-1 text-2xl">
                  {isViewMode ? "View" : selectedId === null ? "Add" : "Edit"} Priests Details
                </ModalHeader>
                <ModalBody className="flex-row p-8">
                  <div className="flex w-full flex-col gap-8">
                    {selectedId && <input type="hidden" name="id" value={selectedId} />}
                    <Input
                      autoFocus
                      label="Parish Priest Name"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      placeholder="Enter name of parish priest"
                      name="name"
                      defaultValue={
                        selectedId ? priests.find((d) => d.id === selectedId)?.name : undefined
                      }
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
    <div className="flex h-full justify-center p-8">
      <Table topContent={<Top />}>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.header}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {priests.map((row, rowIndex) => (
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
                            await deletePriest(row.id);
                            fetchPriests();
                          }
                        }}
                      >
                        <DropdownItem key="edit">Edit</DropdownItem>
                        <DropdownItem key="delete" color="danger" className="text-danger">
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : column.key === "schedule" ? (
                    <Button onPress={() => getSchedule(rowIndex)}>View schedule</Button>
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
