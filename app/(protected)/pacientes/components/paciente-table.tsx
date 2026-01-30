"use client";

import * as React from "react";
import { DataTable } from "./data-table";
import { getPacientes } from "../actions";
import { columns } from "./columns";
import { Paciente } from "../schema";

interface PacienteTableProps {
  initialData: {
    data: Paciente[];
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export function PacienteTable({ initialData }: PacienteTableProps) {
  const [data, setData] = React.useState(initialData.data);
  const [page, setPage] = React.useState(initialData.page);
  const [pageSize] = React.useState(initialData.pageSize);
  const [pageCount, setPageCount] = React.useState(initialData.pageCount);
  const [loading, setLoading] = React.useState(false);

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return;
    setLoading(true);

    const res = await getPacientes({ page: newPage, pageSize });

    setData(res.data);
    setPage(res.page);
    setPageCount(res.pageCount);
    setLoading(false);
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      page={page}
      pageSize={pageSize}
      pageCount={pageCount}
      onPageChange={handlePageChange}
    />
  );
}
