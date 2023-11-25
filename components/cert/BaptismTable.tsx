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
  interface MassData {
    id: number;
    name: string;
    fathername: string;
    mothername: string;
    actions: string[];
  }

  const columns = [
    { header: "Name", key: "name" },
    { header: "Father's Name", key: "fathername" },
    { header: "Mother's Name", key: "mothername" },
    { header: "Actions", key: "actions" },
  ];
  const data: MassData[] = [
    {
      id: 1,
      name: "John Doe",
      fathername: "Michael Doe",
      mothername: "Jane Doe",
      actions: ["Edit", "Delete"],
    },
    {
      id: 2,
      name: "Jane Smith",
      fathername: "David Smith",
      mothername: "Emily Smith",
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
