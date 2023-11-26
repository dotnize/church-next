import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { IconCaretDownFilled } from "@tabler/icons-react";

function Top() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-4xl font-bold">Baptism Certificate</h2>
      <Button className="text-xl" size="lg" color="primary">
        Add Baptism Certificate
      </Button>
    </div>
  );
}

export default function BaptismCertTable() {
  interface BaptismData {
    id: number;
    child_name: string;
    birth_place: string;
    month_of_birth: string;
    day_of_birth: number;
    fathers_name: string;
    mothers_name: string;
    residence: string;
    day_of_baptism: number;
    month_of_baptism: string;
    year_of_baptism: number;
    parish_priest: string;
    sponsor1: string;
    sponsor2: string;
    book_number: string;
    page_number: string;
    date_of_issue: string;
    actions: string[];
  }

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

  const data: BaptismData[] = [
    {
      id: 1,
      child_name: "John Doe",
      birth_place: "City A",
      month_of_birth: "January",
      day_of_birth: 1,
      fathers_name: "Michael Doe",
      mothers_name: "Jane Doe",
      residence: "Address A",
      day_of_baptism: 10,
      month_of_baptism: "February",
      year_of_baptism: 2022,
      parish_priest: "Priest A",
      sponsor1: "Sponsor 1",
      sponsor2: "Sponsor 2",
      book_number: "Book 1",
      page_number: "Page 1",
      date_of_issue: "2022-02-15",
      actions: ["Edit", "Delete"],
    },
    {
      id: 2,
      child_name: "Jane Smith",
      birth_place: "City B",
      month_of_birth: "March",
      day_of_birth: 15,
      fathers_name: "David Smith",
      mothers_name: "Emily Smith",
      residence: "Address B",
      day_of_baptism: 20,
      month_of_baptism: "April",
      year_of_baptism: 2022,
      parish_priest: "Priest B",
      sponsor1: "Sponsor 1",
      sponsor2: "Sponsor 2",
      book_number: "Book 2",
      page_number: "Page 2",
      date_of_issue: "2022-04-25",
      actions: ["Edit", "Delete"],
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
