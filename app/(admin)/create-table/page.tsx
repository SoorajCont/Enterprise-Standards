"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSlug } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateTable = () => {
  const [tableName, setTableName] = useState<string>("");
  const router = useRouter();
  return (
    <div className="flex gap-5 items-center">
      <Input
        placeholder="Enter table name"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
      />
      <Button
        onClick={() => {
          window.localStorage.setItem("tableName", JSON.stringify(tableName));
          router.push(`/create-table/${createSlug(tableName)}`);
        }}
      >
        Create
      </Button>
    </div>
  );
};

export default CreateTable;
