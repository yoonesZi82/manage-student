"use client";

import React from "react";
import {
  IconInnerShadowTop,
  IconSchool,
  IconFolder,
} from "@tabler/icons-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import useGetClass from "@/query-api/useGetClass";
import { IconLoader } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const { data: classList, isPending } = useGetClass();

  const listSideBar = classList?.map((item) => ({
    title: item.name,
    icon: IconFolder,
    items: item.subClass.map((subItem) => ({
      title: subItem.name,
      url: `/class/${subItem.id}`,
      icon: IconSchool,
    })),
  }));

  const data = {
    user: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
    navMain: [...(listSideBar || [])],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="flex flex-row justify-start items-center gap-10">
        <Button variant="ghost" asChild className="hover:bg-transparent w-full">
          <Link href="/">
            <IconInnerShadowTop className="!size-5" />
            {!session ? (
              <Skeleton className="w-10 h-10" />
            ) : (
              <span className="font-semibold text-base">
                خوش آمدید {data.user.name}
              </span>
            )}
          </Link>
        </Button>
      </SidebarHeader>

      <SidebarContent>
        {isPending ? (
          <>
            <NavMain items={data.navMain} />
            <div className="flex justify-center items-center">
              <IconLoader className="animate-spin" size={16} />
            </div>
          </>
        ) : !classList?.length ? (
          <>
            <NavMain />
            <p className="text-muted-foreground text-sm text-center">
              کلاسی یافت نشد
            </p>
          </>
        ) : (
          <NavMain items={data.navMain} />
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
