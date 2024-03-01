import MatrixTable from "@/components/MatrixTable";
import React from "react";

const TablePage = ({ params: { slug } }: { params: { slug: string } }) => {
  return (
    <div>
      <MatrixTable tableName={slug} />
    </div>
  );
};

export default TablePage;
