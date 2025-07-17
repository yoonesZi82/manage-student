import { ColumnDef, Row } from "@tanstack/react-table";
import UserTypes from "@/types/user/UserTypes";
import { formatDate, formatPrice, formatDay } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  IconEdit,
  IconInfoCircle,
  IconLoader2,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PaidAmountTypes from "@/types/paid/PaidAmountTypes";
import axios from "axios";
import { toast } from "react-hot-toast";

let loading = false;

const deleteUserFromSubClass = async (userId: string, subClassId: string) => {
  loading = true;
  await axios
    .delete(`/api/user/delete/class`, {
      data: { userId, subClassId },
    })
    .then(() => {
      loading = false;
      toast.success("کاربر با موفقیت از کلاس حذف شد");
      location.reload();
    })
    .catch(() => {
      loading = false;
      toast.error("خطا در حذف کاربر از کلاس رخ داده است");
    })
    .finally(() => {
      loading = false;
    });
};

const deleteUser = async (userId: string) => {
  loading = true;
  await axios
    .delete(`/api/user/delete`, {
      data: { userId },
    })
    .then(() => {
      loading = false;
      toast.success("کاربر با موفقیت حذف شد");
      location.reload();
    })
    .catch(() => {
      loading = false;
      toast.error("خطا در حذف کاربر رخ داده است");
    })
    .finally(() => {
      loading = false;
    });
};

export function getColumns({
  isMobile,
  paidAmount,
  classId,
  price,
  day,
  startTime,
  endTime,
}: {
  isMobile: boolean;
  paidAmount: PaidAmountTypes[];
  classId: string;
  price: number;
  day:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  startTime: string;
  endTime: string;
}): ColumnDef<UserTypes>[] {
  return [
    {
      accessorKey: "id",
      header: "ردیف",
      cell: ({ row }: { row: Row<UserTypes> }) => {
        return <p>{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "name",
      header: "نام",
    },
    {
      accessorKey: "phone",
      header: "شماره تلفن",
      cell: ({ row }: { row: Row<UserTypes> }) => {
        return (
          <Link
            href={`tel:${row.original.phone}`}
            className="hover:text-primary hover:underline transition-colors duration-300"
          >
            {row.original.phone}
          </Link>
        );
      },
    },
    {
      accessorKey: "fatherName",
      header: "نام پدر",
    },
    {
      accessorKey: "birthDate",
      header: "تاریخ تولد",
      cell: ({ row }: { row: Row<UserTypes> }) => {
        return <p>{formatDate(row.original.birthDate)}</p>;
      },
    },
    {
      accessorKey: "gender",
      header: "جنسیت",
      cell: ({ row }: { row: Row<UserTypes> }) => {
        return <p>{row.original.gender === "male" ? "پسر" : "دختر"}</p>;
      },
    },
    {
      accessorKey: "city",
      header: "شهر",
    },
    {
      accessorKey: "day",
      header: "روز کلاس",
      cell: () => {
        return <Badge>{formatDay(day)}</Badge>;
      },
    },
    {
      accessorKey: "startTime",
      header: " ساعت شروع کلاس",
      cell: () => {
        return <Badge>{startTime}</Badge>;
      },
    },
    {
      accessorKey: "endTime",
      header: " ساعت پایان کلاس",
      cell: () => {
        return <Badge>{endTime}</Badge>;
      },
    },
    {
      accessorKey: "status",
      header: "وضعیت پرداخت",
      cell: ({ row }: { row: Row<UserTypes> }) => {
        const userId = row.original.id;
        const paidAmountUser = paidAmount.find(
          (paid) => paid.subClass.id === classId && paid.user.id === userId
        );

        return (
          <Badge
            variant={
              paidAmountUser?.status === "PENDING"
                ? "warning"
                : paidAmountUser?.status === "ACTIVE"
                ? "success"
                : "destructive"
            }
            className="border-0"
          >
            {paidAmountUser?.status === "PENDING"
              ? "تکمیل نشده"
              : paidAmountUser?.status === "ACTIVE"
              ? "پرداخت شده"
              : "پرداخت نشده"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "paidAmount",
      header: "مبلغ پرداختی",
      cell: ({ row }: { row: Row<UserTypes> }) => {
        const userId = row.original.id;
        const paidAmountUser = paidAmount.find(
          (paid) => paid.subClass.id === classId && paid.user.id === userId
        );

        return (
          <p>
            {paidAmountUser?.price
              ? formatPrice(paidAmountUser?.price ?? 0)
              : "-"}
          </p>
        );
      },
    },
    {
      accessorKey: "amountRemaining",
      header: "مبلغ مانده",
      cell: ({ row }: { row: Row<UserTypes> }) => {
        const userId = row.original.id;
        const paidAmountUser = paidAmount.find(
          (paid) => paid.subClass.id === classId && paid.user.id === userId
        );

        const amountRemaining = price - (paidAmountUser?.price ?? 0);

        return <p>{formatPrice(amountRemaining)}</p>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "تاریخ ایجاد",
      cell: ({ row }: { row: Row<UserTypes> }) => {
        return <p>{formatDate(row.original.createdAt)}</p>;
      },
    },
    {
      accessorKey: "address",
      header: "آدرس",
      cell: ({ row }: { row: Row<UserTypes> }) => {
        return (
          <>
            {!isMobile ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <IconInfoCircle />
                  </Button>
                </DialogTrigger>
                <DialogContent showCloseButton={false}>
                  <DialogHeader className="flex flex-row justify-between items-center gap-2">
                    <DialogTitle>آدرس کاربر</DialogTitle>
                    <DialogClose asChild>
                      <Button variant="ghost" size="icon">
                        <IconX />
                      </Button>
                    </DialogClose>
                    <DialogDescription className="hidden" />
                  </DialogHeader>
                  <Textarea
                    value={row.original.address}
                    className="min-h-[250px] resize-none"
                    disabled
                  />
                </DialogContent>
              </Dialog>
            ) : (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="icon">
                    <IconInfoCircle />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>آدرس کاربر</DrawerTitle>
                    <DrawerDescription className="hidden" />
                  </DrawerHeader>
                  <DrawerFooter>
                    <Textarea
                      value={row.original.address}
                      className="min-h-[250px] resize-none"
                      disabled
                    />
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}
          </>
        );
      },
    },
    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }: { row: Row<UserTypes> }) => {
        return (
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-8">
              <DropdownMenuItem asChild>
                <Link
                  href={`/users/edit/${row.original.id}?classId=${classId}&price=${price}`}
                >
                  <IconEdit />
                  ویرایش کاربر
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/class/sub/edit/${classId}`}>
                  <IconEdit />
                  ویرایش کلاس
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteUserFromSubClass(row.original.id, classId)}
                disabled={loading}
              >
                {loading ? (
                  <IconLoader2 className="animate-spin" />
                ) : (
                  <>
                    <IconTrash />
                    حذف کاربر از کلاس
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive hover:!text-destructive"
                asChild
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="justify-start w-full">
                      <IconTrash className="text-destructive" />
                      <span className="text-destructive">حذف کاربر</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent showCloseButton={false}>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        حذف کاربر
                      </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-center">
                      آیا می خواهید کاربر را حذف کنید؟
                    </DialogDescription>
                    <DialogFooter className="flex !flex-row !justify-center items-center gap-4 w-full">
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={() => deleteUser(row.original.id)}
                      >
                        <IconTrash />
                        حذف کاربر
                      </Button>
                      <DialogClose asChild>
                        <Button variant="outline" size="lg">
                          انصراف
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
