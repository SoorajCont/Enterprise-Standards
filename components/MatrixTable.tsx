"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { capitalizeFirstLetter } from "@/lib/utils";

const MatrixTable = ({ tableName }: { tableName: string }) => {
  const [columns, setColumns] =
    useState<
      [{ columnHeader: string; headerType: string; dataType: string }]
    >();

  const [tableFields, setTableFields] = useState([{}]);

  useEffect(() => {
    const response = window.localStorage.getItem("data");
    const data:
      | [{ columnHeader: string; headerType: string; dataType: string }]
      | null = JSON.parse(response!);

    if (data) setColumns(data);
    // console.log(data);
  }, []);

  const inputHeaders = columns?.filter(
    (column) => column.headerType === "input"
  );

  // console.log(inputHeaders);
  const outputHeaders = columns?.filter(
    (column) => column.headerType === "output"
  );
  // console.log(outputHeaders);

  const addRow = () => {
    let newRow: any = {};
    inputHeaders?.map((column) => {
      newRow[column.columnHeader] = column.dataType === "text" ? "" : 0;
    });
    outputHeaders?.map((column) => {
      newRow[column.columnHeader] = column.dataType === "text" ? "" : 0;
    });

    setTableFields([...tableFields, newRow]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (tableFields.length === 0) {
      alert("Please add at least one row");
      return;
    }

    const isBlank = tableFields.some((field) =>
      Object.values(field).some((value) => !value)
    );

    if (isBlank) {
      alert("All fields are required");
      return;
    }
  };

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl">{tableName}</h1>
      <Table className="w-full mt-5">
        <TableHeader>
          <TableRow>
            <TableHead
              colSpan={
                columns?.filter((column) => column.headerType === "input")
                  .length
              }
            >
              Input
            </TableHead>
            <TableHead
              colSpan={
                columns?.filter((column) => column.headerType === "output")
                  .length
              }
            >
              Output
            </TableHead>
          </TableRow>
          <TableRow>
            {inputHeaders?.map((header, index) => (
              <TableHead key={index}>
                {header.columnHeader} (
                <span className="text-bold text-black">
                  {capitalizeFirstLetter(header.dataType)}
                </span>
                )
              </TableHead>
            ))}
            {outputHeaders?.map((column, index) => (
              <TableHead key={index}>
                {column.columnHeader}{" "}
                <span className="text-bold text-black">
                  ({capitalizeFirstLetter(column.dataType)})
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableFields?.map((row: any, tableIndex) => (
            <TableRow key={tableIndex}>
              {inputHeaders?.map((column, index) => (
                <TableCell key={index}>
                  <Input
                    type={column.dataType}
                    value={row[column.columnHeader]}
                    onChange={(e) => {
                      let newTableFields: any = [...tableFields];
                      newTableFields[tableIndex][column.columnHeader] =
                        e.target.value;
                      setTableFields(newTableFields);
                    }}
                    className="border-none"
                  />
                </TableCell>
              ))}
              {outputHeaders?.map((column, index) => (
                <TableCell key={index}>
                  <Input
                    type={column.dataType}
                    value={row[column.columnHeader]}
                    onChange={(e) => {
                      let newTableFields: any = [...tableFields];
                      newTableFields[tableIndex][column.columnHeader] =
                        e.target.value;
                      setTableFields(newTableFields);
                    }}
                    className="border-none"
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-5">
        <Button onClick={addRow}>Add new row</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default MatrixTable;
