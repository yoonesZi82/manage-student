"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IconHome } from "@tabler/icons-react";
import useFindSubClass from "@/query-api/useFindSubClass";
import useFindClass from "@/query-api/useFindClass";
import { Skeleton } from "../ui/skeleton";

function BreadcrumbUi() {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter(Boolean);

  const isClassRootPage = pathname === "/class";
  const isClassCreatePage = pathname === "/class/create";
  const isUsersAddPage = pathname === "/users/add";
  const isUsersEditPage =
    pathnames.length === 3 &&
    pathnames[0] === "users" &&
    pathnames[1] === "edit" &&
    /^[a-f0-9]{24}$/.test(pathnames[2]);

  const isViewSubClassPage =
    pathnames.length === 2 &&
    pathnames[0] === "class" &&
    /^[a-f0-9]{24}$/.test(pathnames[1]);

  const isEditSubClassPage =
    pathnames.length === 4 &&
    pathnames[0] === "class" &&
    pathnames[1] === "sub" &&
    pathnames[2] === "edit" &&
    /^[a-f0-9]{24}$/.test(pathnames[3]);

  const isEditClassPage =
    pathnames.length === 3 &&
    pathnames[0] === "class" &&
    pathnames[1] === "edit" &&
    /^[a-f0-9]{24}$/.test(pathnames[2]);

  const classId = isEditClassPage ? pathnames[2] : null;
  const subClassId = isEditSubClassPage
    ? pathnames[3]
    : isViewSubClassPage
    ? pathnames[1]
    : null;

  const { data: classData, isPending: isClassPending } = useFindClass(
    classId ?? ""
  );

  const { data: subClassData, isPending: isSubClassPending } = useFindSubClass(
    subClassId ?? ""
  );

  return (
    <Breadcrumb dir="rtl">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <IconHome size={16} />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* /class */}
        {isClassRootPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>کلاس‌ها</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {/* /class/create */}
        {isClassCreatePage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/class">کلاس‌ها</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ساخت کلاس جدید</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {/* /class/[id] */}
        {isViewSubClassPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/class">کلاس‌ها</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {isClassPending ? (
                  <Skeleton className="bg-muted w-20 h-4" />
                ) : (
                  subClassData?.class?.name ?? "کلاس ناشناس"
                )}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isSubClassPending ? (
                <Skeleton className="bg-muted w-20 h-4" />
              ) : (
                <BreadcrumbPage>
                  {subClassData?.name ?? "کلاس ناشناس"}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* /class/sub/edit/[id] */}
        {isEditSubClassPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ویرایش کلاس</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isSubClassPending ? (
                <Skeleton className="bg-muted w-20 h-4" />
              ) : (
                <BreadcrumbPage>
                  {subClassData?.name ?? "کلاس ناشناس"}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* /class/edit/[id] */}
        {isEditClassPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/class">کلاس‌ها</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ویرایش کلاس</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isClassPending ? (
                <Skeleton className="bg-muted w-20 h-4" />
              ) : (
                <BreadcrumbPage>
                  {classData?.name ?? "کلاس ناشناس"}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* /users/add */}
        {isUsersAddPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>افزودن کاربر جدید</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {/* /users/edit/[id] */}
        {isUsersEditPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ویرایش کاربر</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbUi;
