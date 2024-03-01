"use client";

import { createSlug } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [tableName, setTableName] = useState("");
  useEffect(() => {
    const tableName = window.localStorage.getItem("tableName");
    setTableName(JSON.parse(tableName!));
    console.log(tableName);
  }, []);

  return (
    <div>
      <Link href={`/dashboard/${createSlug(tableName)}`}>{tableName}</Link>
    </div>
  );
};

export default DashboardPage;
