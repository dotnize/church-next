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

import { createMarriage, deleteMarriage, getMarriages, updateMarriage } from "~/actions/marriage";
import { getPriests } from "~/actions/priests";
import { getOrdinal } from "~/lib/utils";

export default function MarriageCertTable() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [priests, setPriests] = useState<any>([]);
  const [marriage, setMarriage] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const columns = [
    { header: "Husband Name", key: "husband_name" },
    { header: "Husband Place of Birth", key: "husband_place_of_birth" },
    { header: "Wife Name", key: "wife_name" },
    { header: "Wife Place of Birth", key: "wife_place_of_birth" },
    { header: "Date of Marriage", key: "date_of_marriage" },
    { header: "Priest", key: "parish_priest" },
    { header: "Solemnization Date", key: "solemnization_date" },
    { header: "Status", key: "status" },
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

  async function printData(selectedData: any) {
    const doc = new PDFDocument({ size: "A2" });
    const stream = doc.pipe(blobStream());

    const res = await fetch("/certificates/marriage.jpg");
    const image = Buffer.from(await res.arrayBuffer());
    doc.image(image, 0, 0, { width: 1190, height: 1684 });
    doc.font("Courier");

    const husband_name = selectedData.husband_name;
    const husband_legal_status = selectedData.husband_legal_status;
    const husband_actual_address = selectedData.husband_actual_address;
    const husband_age = selectedData.husband_age;
    const husband_place_of_birth = selectedData.husband_place_of_birth;
    const husband_mother = selectedData.husband_mother;
    const husband_father = selectedData.husband_father;
    const husband_date_of_baptism = format(selectedData.husband_date_of_baptism, "yyyy-MM-dd");
    const husband_place_of_baptism = selectedData.husband_place_of_baptism;
    const husband_witness = selectedData.husband_witness;

    const wife_name = selectedData.wife_name;
    const wife_legal_status = selectedData.wife_legal_status;
    const wife_actual_address = selectedData.wife_actual_address;
    const wife_age = selectedData.wife_age;
    const wife_place_of_birth = selectedData.wife_place_of_birth;
    const wife_mother = selectedData.wife_mother;
    const wife_father = selectedData.wife_father;
    const wife_date_of_baptism = format(selectedData.wife_date_of_baptism, "yyyy-MM-dd");
    const wife_place_of_baptism = selectedData.wife_place_of_baptism;
    const wife_witness = selectedData.wife_witness;

    const date_of_marriage = format(selectedData.date_of_marriage, "MMMM dd, yyyy");
    const position = selectedData.position;
    const book_number = selectedData.book_number;
    const page_number = selectedData.page_number;
    const entry_number = selectedData.entry_number;
    const day_of_sol = getOrdinal(format(selectedData.solemnization_date, "dd"));
    const month_of_sol = format(selectedData.solemnization_date, "MMMM");
    const year_of_sol = format(selectedData.solemnization_date, "yyyy");
    const solemnization_place = selectedData.solemnization_place;
    const parish_priest = selectedData.parish_priest;

    // TODO: reduce font sizes for long texts

    doc
      .fontSize(18)
      .text(husband_name, 464, 530, { width: 330, align: "center", characterSpacing: -1 });
    doc
      .fontSize(18)
      .text(husband_legal_status, 464, 564, { width: 330, align: "center", characterSpacing: -1 });
    doc.fontSize(18).text(husband_actual_address, 464, 598, {
      width: 330,
      align: "center",
      characterSpacing: -1,
    });

    doc.fontSize(18).text(husband_age, 464, 632, { width: 330, align: "center" });
    doc.fontSize(18).text(husband_place_of_birth, 464, 668, {
      width: 330,
      align: "center",
      characterSpacing: -1,
    });
    doc.fontSize(18).text(husband_date_of_baptism, 464, 704, { width: 330, align: "center" });
    doc.fontSize(18).text(husband_place_of_baptism, 464, 740, {
      width: 330,
      align: "center",
      characterSpacing: -1,
    });
    doc
      .fontSize(18)
      .text(husband_father, 464, 772, { width: 330, align: "center", characterSpacing: -1 });
    doc
      .fontSize(18)
      .text(husband_mother, 464, 808, { width: 330, align: "center", characterSpacing: -1 });
    doc
      .fontSize(18)
      .text(husband_witness, 464, 842, { width: 330, align: "center", characterSpacing: -1 });

    doc
      .fontSize(18)
      .text(wife_name, 802, 530, { width: 282, align: "center", characterSpacing: -1 });
    doc.fontSize(18).text(wife_legal_status, 802, 564, {
      width: 282,
      align: "center",
      characterSpacing: -1,
    });
    doc.fontSize(18).text(wife_actual_address, 802, 598, {
      width: 282,
      align: "center",
      characterSpacing: -1,
    });

    doc.fontSize(18).text(wife_age, 802, 632, { width: 282, align: "center" });
    doc.fontSize(18).text(wife_place_of_birth, 802, 668, {
      width: 282,
      align: "center",
      characterSpacing: -1,
    });
    doc.fontSize(18).text(wife_date_of_baptism, 802, 704, { width: 282, align: "center" });
    doc.fontSize(18).text(wife_place_of_baptism, 802, 740, {
      width: 282,
      align: "center",
      characterSpacing: -1,
    });
    doc
      .fontSize(18)
      .text(wife_father, 802, 772, { width: 282, align: "center", characterSpacing: -1 });
    doc
      .fontSize(18)
      .text(wife_mother, 802, 808, { width: 282, align: "center", characterSpacing: -1 });
    doc
      .fontSize(18)
      .text(wife_witness, 802, 842, { width: 282, align: "center", characterSpacing: -1 });

    doc.fontSize(20).text(date_of_marriage, 350, 878, { width: 500, align: "left" });
    doc
      .fontSize(18)
      .text(position, 250, 978, { width: 128, align: "center", characterSpacing: -1 });
    doc.fontSize(22).text(book_number, 670, 1166, { width: 126, align: "center" });
    doc.fontSize(22).text(page_number, 872, 1166, { width: 74, align: "center" });
    doc.fontSize(22).text(entry_number, 1004, 1166, { width: 74, align: "center" });
    doc
      .fontSize(22)
      .text("this " + day_of_sol, 210, 1276, { width: 204, align: "center", characterSpacing: -1 });
    doc.fontSize(22).text(month_of_sol, 506, 1276, { width: 164, align: "center" });
    doc.fontSize(22).text(year_of_sol, 702, 1276, { width: 140, align: "center" });
    doc
      .fontSize(18)
      .text(solemnization_place, 858, 1278, { width: 230, align: "left", characterSpacing: -1 });

    doc
      .fontSize(24)
      .text(parish_priest, 660, 1454, { width: 444, align: "center", characterSpacing: -1 });

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
        <h2 className="text-4xl font-bold">Marriage Certificate</h2>
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      pattern="[0-9]+"
                      name="husband_age"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      disabled={isViewMode}
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
                    <Select
                      autoFocus
                      label="Status"
                      disabled={isViewMode}
                      isRequired={!isViewMode}
                      defaultSelectedKeys={
                        selectedId
                          ? [marriage.find((d) => d.id === selectedId)?.status.toString()]
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
                      label="Husband's Mother Name"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                    <Input
                      autoFocus
                      label="Date of issue"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="date_of_issue"
                      defaultValue={
                        selectedId && marriage.find((d) => d.id === selectedId)?.date_of_issue
                          ? format(
                              marriage.find((d) => d.id === selectedId)?.date_of_issue,
                              "yyyy-MM-dd"
                            )
                          : undefined
                      }
                      placeholder="Enter date issued"
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      pattern="[0-9]+"
                      name="wife_age"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                    <Input
                      autoFocus
                      label="Requester Name"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="requester_name"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.requester_name
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
                      label="Date of Marriage"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      pattern="[0-9]+"
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
                      pattern="[0-9]+"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                      pattern="[0-9]+"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
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
                    <Input
                      autoFocus
                      label="Submitted Requirements"
                      isRequired={!isViewMode}
                      readOnly={isViewMode}
                      name="submitted_requirements"
                      defaultValue={
                        selectedId
                          ? marriage.find((d) => d.id === selectedId)?.submitted_requirements
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
                            setIsViewMode(false);
                            onOpen();
                          } else if (key === "delete") {
                            await deleteMarriage(row.id);
                            fetchMarriage();
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
