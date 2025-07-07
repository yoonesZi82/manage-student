import { ColumnDef, Row } from "@tanstack/react-table";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconEdit, IconList, IconTrash } from "@tabler/icons-react";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClassTypes from "@/types/class/ClassTypes";
import DeleteClass from "./delete-class";

export function getColumns(): ColumnDef<ClassTypes>[] {
  return [
    {
      accessorKey: "id",
      header: "ردیف",
      cell: ({ row }: { row: Row<ClassTypes> }) => {
        return <p>{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "name",
      header: "نام کلاس",
    },
    {
      accessorKey: "subClassCount",
      header: "تعداد مجاز زیر مجموعه کلاس ها",
    },
    {
      accessorKey: "subClass",
      header: "زیر مجموعه کلاس ها",
      cell: ({ row }: { row: Row<ClassTypes> }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <IconList />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={cn(
                "place-content-center place-items-center grid w-fit max-w-[300px] max-h-[150px] overflow-y-auto",
                row.original.subClass.length > 0
                  ? "grid-cols-2 "
                  : "grid-cols-1"
              )}
            >
              {row.original.subClass.length > 0 ? (
                row.original.subClass.map((subClass) => (
                  <DropdownMenuItem
                    key={subClass.id}
                    className="hover:!bg-transparent w-full cursor-default"
                  >
                    <Badge className="flex justify-between items-center gap-2 w-full">
                      <Link href={`/class/${subClass.id}`}>
                        <span className="">{subClass.name}</span>
                      </Link>
                      <div className="flex items-center gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hover:!bg-transparent !p-0 w-fit h-fit"
                          asChild
                        >
                          <Link href={`/class/sub/edit/${subClass.id}`}>
                            <IconEdit className="text-destructive dark:text-black" />
                          </Link>
                        </Button>
                        <DeleteClass
                          id={subClass.id}
                          name={subClass.name}
                          api="/api/class/sub/delete"
                        />
                      </div>
                    </Badge>
                  </DropdownMenuItem>
                ))
              ) : (
                <p className="p-1 text-muted-foreground text-xs">
                  هیچ زیر مجموعه ای وجود ندارد
                </p>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "تاریخ ایجاد",
      cell: ({ row }: { row: Row<ClassTypes> }) => {
        return <p>{formatDate(row.original.createdAt)}</p>;
      },
    },
    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }: { row: Row<ClassTypes> }) => {
        return (
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-8">
              <DropdownMenuItem asChild>
                <Link href={`/class/edit/${row.original.id}`}>
                  <IconEdit />
                  ویرایش کلاس
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive hover:!text-destructive"
                asChild
              >
                <DeleteClass
                  id={row.original.id}
                  name={row.original.name}
                  api={`/api/class/delete`}
                  trigger={
                    <Button variant="ghost" className="justify-start w-full">
                      <IconTrash className="text-destructive" />
                      <span className="text-destructive">حذف کلاس</span>
                    </Button>
                  }
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
