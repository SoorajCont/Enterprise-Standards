"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Field {
  columnHeader: string;
  headerType: string;
  dataType: string;
}

const Table = ({ params: { slug } }: { params: { slug: string } }) => {
  const router = useRouter();
  const [inputFields, setInputFields] = useState<Field[]>([
    { columnHeader: "", headerType: "", dataType: "" },
  ]);
  const [isInput, setIsInput] = useState<boolean[]>([false]);

  const addRow = () => {
    if (inputFields.length >= 10) {
      alert("You have reached the maximum number of fields (10).");
      return;
    }
    setInputFields([
      ...inputFields,
      { columnHeader: "", headerType: "", dataType: "" },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isBlank = inputFields.some(
      (field) => !field.columnHeader || !field.headerType || !field.dataType
    );

    if (isBlank) {
      alert("All fields are required.");
      return;
    }

    const outputCount = inputFields.filter(
      (field) => field.headerType === "output"
    ).length;

    if (outputCount === 0) {
      alert("At least one output field is required.");
      return;
    } else if (outputCount > 3) {
      alert("You can only have 3 output fields.");
      return;
    }

    const inputCount: number = inputFields.filter(
      (field) => field.headerType === "input"
    ).length;

    if (inputCount === 0) {
      alert("At least one input field is required.");
      return;
    } else if (inputCount > 7) {
      alert("You can only have 7 input fields.");
      return;
    }

    window.localStorage.setItem("data", JSON.stringify(inputFields));
    console.log("Data", inputFields);

    router.push(`/create-table/${slug}/table`);
  };

  const removeRow = (index: number) => {
    if (inputFields.length === 1) {
      alert("At least one field is required.");
      return;
    }
    setInputFields(inputFields.filter((_, i) => i !== index));
  };

  let tableName;

  useEffect(() => {
    tableName = JSON.parse(window.localStorage.getItem("tableName")!);
    console.log(tableName);
  }, []);

  useEffect(() => {
    const inputCount = inputFields.filter(
      (field) => field.headerType === "input"
    ).length;
    const outputCount = inputFields.filter(
      (field) => field.headerType === "output"
    ).length;

    if (inputCount > 7) {
      alert("You can only have 7 input fields.");
      return;
    } else if (outputCount > 3) {
      alert("You can only have 3 output fields.");
      return;
    }
    const newIsInput = inputFields.map((field) => field.headerType === "input");
    setIsInput(newIsInput);
  }, [inputFields, setInputFields]);

  return (
    <section className="">
      <h1 className="text-3xl font-bold">{tableName && tableName} Table</h1>
      <p className="text-muted-foreground">
        Create columns for the{" "}
        <span className="text-primary font-semibold">{tableName}</span> table
      </p>
      <div className="flex flex-col items-start gap-5">
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-5 flex flex-col gap-5"
        >
          {inputFields.map((item, index) => (
            <div key={index} className="flex gap-5">
              <Input
                type="text"
                name={"columnHeader"}
                placeholder="Column Header"
                onChange={(e) => {
                  setInputFields(
                    inputFields.map((field, i) =>
                      i === index
                        ? { ...field, columnHeader: e.target.value }
                        : field
                    )
                  );
                }}
                value={item.columnHeader}
                className="min-w-24"
              />
              <div className="min-w-40">
                <Select
                  name="headerType"
                  onValueChange={(e) => {
                    setInputFields(
                      inputFields.map((field, i) =>
                        i === index ? { ...field, headerType: e } : field
                      )
                    );
                  }}
                  defaultValue="input"
                  value={item.headerType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Header Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="input">Input</SelectItem>
                    <SelectItem value="output">Output</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="min-w-40">
                <Select
                  name="dataType"
                  onValueChange={(e) => {
                    setInputFields(
                      inputFields.map((field, i) =>
                        i === index ? { ...field, dataType: e } : field
                      )
                    );
                  }}
                  defaultValue="text"
                  value={item.dataType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Data Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    {isInput[index] && (
                      <SelectItem value="number">Number</SelectItem>
                    )}
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="boolean">Boolean</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant={"destructive"}
                onClick={() => removeRow(index)}
                disabled={inputFields.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}
        </form>
        <div className="flex gap-5">
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={addRow}>Add Fields</Button>
        </div>
      </div>
    </section>
  );
};

export default Table;
