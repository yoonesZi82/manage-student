"use client";
import React, { useState } from "react";
import useFindSubClass from "@/query-api/useFindSubClass";
import { Input } from "@/components/ui/input";
import AddUser from "../add-user/AddUser";
import UserTypes from "@/types/user/UserTypes";
import ManageTable from "@/components/manage-table/ManageTable";
import { getColumns } from "./columns";
import { useIsMobile } from "@/hooks/use-mobile";
import { ColumnFilter, ColumnFiltersState } from "@tanstack/react-table";
import { formatPrice } from "@/lib/utils";

function TableUser({ id }: { id: string }) {
  const { data, isPending } = useFindSubClass(id);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const isMobile = useIsMobile();

  const columns = getColumns({
    isMobile,
    paidAmount: data?.paidAmounts ?? [],
    classId: id,
    price: data?.totalAmount ?? 0,
    day: data?.day as
      | "MONDAY"
      | "TUESDAY"
      | "WEDNESDAY"
      | "THURSDAY"
      | "FRIDAY"
      | "SATURDAY"
      | "SUNDAY",
    startTime: data?.startTime ?? "",
    endTime: data?.endTime ?? "",
  });

  const totalPaidAmount = data?.paidAmounts?.reduce(
    (acc, paid) => acc + paid.price,
    0
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center gap-10 w-full">
        <Input
          type="search"
          placeholder="جستجو بر اساس نام ..."
          className="shadow-none py-5 rounded-lg max-w-xs"
          value={columnFilters.map((filter) => filter.value).join(", ")}
          onChange={(e) => {
            setColumnFilters([
              { id: "name", value: e.target.value } as ColumnFilter,
            ]);
          }}
        />
        <AddUser SubClassUsers={data?.userSubClasses} id={id} />
      </div>
      <ManageTable<UserTypes>
        columns={columns}
        data={data?.userSubClasses?.map((user) => user.user) ?? []}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        isShowDescription={true}
        isLoading={isPending}
        description={
          <div className="flex justify-between items-center pb-2 w-full">
            <p className="font-semibold text-black dark:text-white text-lg">
              درآمد از این کلاس :
            </p>
            <p className="font-semibold text-primary text-lg">
              {formatPrice(totalPaidAmount ?? 0)}
            </p>
          </div>
        }
      />
    </div>
  );
}

export default TableUser;
