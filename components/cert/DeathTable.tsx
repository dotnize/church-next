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
      <h2 className="text-4xl font-bold">Death Certificate</h2>
      <Button className="text-xl" size="lg" color="primary">
        Add Death Certificate
      </Button>
    </div>
  );
}

export default function DeathCertTable() {
  interface DeceasedData {
    id: number;
    name: string;
    residence: string;
    age: number;
    datedeath: string;
    dateburial: string;
    placeburial: string;
    relativeinfo: string;
    actions: string[];
  }

  const columns = [
    { header: "Name", key: "name" },
    { header: "Residence", key: "residence" },
    { header: "Age", key: "age" },
    { header: "Date of Death", key: "datedeath" },
    { header: "Date of Burial", key: "dateburial" },
    { header: "Place of Burial", key: "placeburial" },
    { header: "Relative Information", key: "relativeinfo" },
  ];

  const data: DeceasedData[] = [
    {
      id: 1,
      name: "John Doe",
      residence: "New York",
      age: 45,
      datedeath: "2022-01-01",
      dateburial: "2022-01-05",
      placeburial: "Cemetery",
      relativeinfo: "Lorem ipsum dolor sit amet",
      actions: ["View", "Edit", "Delete"],
    },
    {
      id: 2,
      name: "Jane Smith",
      residence: "Los Angeles",
      age: 50,
      datedeath: "2022-02-01",
      dateburial: "2022-02-05",
      placeburial: "Graveyard",
      relativeinfo: "Consectetur adipiscing elit",
      actions: ["View", "Edit", "Delete"],
    },
    // Add more data objects as needed
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
