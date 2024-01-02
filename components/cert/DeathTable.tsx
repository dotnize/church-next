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

import { createDeceased, deleteDeceased, getDeceased, updateDeceased } from "~/actions/deceased";
import { getPriests } from "~/actions/priests";

export default function DeathCertTable() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // TODO: move to main/default component
  const [priests, setPriests] = useState<any>([]);
  const [deceased, setDeceased] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const columns = [
    { header: "Name of Deceased", key: "deceasedName" },
    { header: "Residence", key: "residence" },
    { header: "Age", key: "age" },
    { header: "Date of Death", key: "dateOfDeath" },
    { header: "Date of Burial", key: "dateOfBurial" },
    { header: "Place of Burial", key: "placeOfBurial" },
    { header: "Relative Information", key: "relativeInfo" },
    { header: "Status", key: "status" },
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

  async function printData(selectedData: any) {
    if (
      !selectedData ||
      !selectedData.volume ||
      !selectedData.pageNumber ||
      !selectedData.entryNumber ||
      !selectedData.deceasedName ||
      !selectedData.residence ||
      !selectedData.age ||
      !selectedData.dateOfDeath ||
      !selectedData.placeOfBurial ||
      !selectedData.dateOfBurial ||
      !selectedData.relativeInfo ||
      !selectedData.date_of_issue ||
      !selectedData.parish_priest
    ) {
      alert("Cannot generate certificate. Please complete the required fields.");
      return;
    }
    const doc = new PDFDocument({ size: "A1", layout: "landscape" });
    const stream = doc.pipe(blobStream());

    const res = await fetch("/certificates/death.jpg");
    const image = Buffer.from(await res.arrayBuffer());
    doc.image(image, 0, 0, { width: 2384, height: 1684 });
    doc.font("Courier");

    const volume = selectedData.volume;
    const pageNumber = selectedData.pageNumber;
    const entryNumber = selectedData.entryNumber;
    const deceasedName = selectedData.deceasedName;
    const residence = selectedData.residence;
    const age = selectedData.age;
    const dateOfDeath = format(selectedData.dateOfDeath, "MMMM dd, yyyy");
    const placeOfBurial = selectedData.placeOfBurial;
    const dateOfBurial = format(selectedData.dateOfBurial, "yyyy/MM/dd");
    const relativeInfo = selectedData.relativeInfo;
    const dateOfIssue = format(selectedData.date_of_issue, "yyyy-MM-dd");
    const priest = selectedData.parish_priest;

    // TODO: reduce font sizes for long texts

    doc.fontSize(40).text(volume, 604, 962, { width: 400, align: "center" });
    doc.fontSize(40).text(pageNumber, 1204, 962, { width: 352, align: "center" });
    doc.fontSize(40).text(entryNumber, 1742, 962, { width: 268, align: "center" });

    doc
      .fontSize(40)
      .text(deceasedName, 680, 1030, { width: 1340, align: "left", characterSpacing: -1 });
    doc
      .fontSize(40)
      .text(residence, 540, 1100, { width: 1500, align: "left", characterSpacing: -1 });

    doc.fontSize(40).text(age, 410, 1170, { width: 586, align: "center" });
    doc.fontSize(40).text(dateOfDeath, 1290, 1170, { width: 730, align: "center" });

    doc.fontSize(40).text(placeOfBurial + ", " + dateOfBurial, 770, 1238, {
      width: 1260,
      align: "left",
      characterSpacing: -1,
    });
    doc.fontSize(40).text(relativeInfo, 776, 1308, {
      width: 1250,
      align: "left",
      characterSpacing: -1,
    });

    doc.fontSize(40).text(dateOfIssue, 420, 1446, { width: 404, align: "center" });
    doc
      .fontSize(32)
      .text(priest, 1420, 1446, { width: 560, align: "center", characterSpacing: -1 });

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
        <h2 className="text-4xl font-bold">Death Certificate</h2>
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
                  {isViewMode ? "View" : selectedId === null ? "Add" : "Edit"} Death Certificate
                </ModalHeader>
                <ModalBody className="flex-row p-8">
                  <div className="flex w-full flex-col gap-8">
                    {selectedId && <input type="hidden" name="id" value={selectedId} />}
                    <Input
                      autoFocus
                      label="Name of Deceased"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      pattern="[0-9]+"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      disabled={isViewMode}
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
                      disabled={isViewMode}
                      isRequired={!isViewMode}
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
                      label="Residence"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                  </div>
                  <div className="flex w-full flex-col gap-8">
                    <Input
                      autoFocus
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                            setIsViewMode(false);
                            onOpen();
                          } else if (key === "delete") {
                            await deleteDeceased(row.id);
                            fetchDeceased();
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
