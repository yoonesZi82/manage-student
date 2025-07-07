"use client";
import ManageTable from "@/components/manage-table/ManageTable";
import ClassTypes from "@/types/class/ClassTypes";
import React, { useState } from "react";
import { getColumns } from "./columns";
import useGetClass from "@/query-api/useGetClass";
import { Input } from "@/components/ui/input";
import { ColumnFilter, ColumnFiltersState } from "@tanstack/react-table";

function ClassTable() {
  const columns = getColumns();
  const { data, isPending } = useGetClass();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        type="search"
        placeholder=" جستجو بر اساس نام کلاس ..."
        className="shadow-none py-5 rounded-lg max-w-xs"
        value={columnFilters.map((filter) => filter.value).join(", ")}
        onChange={(e) => {
          setColumnFilters([
            { id: "name", value: e.target.value } as ColumnFilter,
          ]);
        }}
      />
      <ManageTable<ClassTypes>
        columns={columns}
        data={data || []}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        isLoading={isPending}
        emptyMessage="هیچ کلاسی یافت نشد"
      />
    </div>
  );
}

export default ClassTable;
